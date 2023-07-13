import { mongooseConnect } from "@/lib/connectDB";
import { Order } from "@/models/Order";
import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SK);
const endpointSecret =
  "whsec_055b69d3e3b3f67b48a534c8a935520b895b52c3a6c67685b0cf6b1511104e1d";
export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      console.log(orderId);
      console.log(paid);
      if (orderId && paid) {
        console.log("Entered");
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok")
}
export const config = {
  api: { bodyParser: false },
};
