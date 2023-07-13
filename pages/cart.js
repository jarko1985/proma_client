import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import {useSession} from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
`;

const StyledTitle = styled.h2``;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  max-width: 150px;
  max-height: 150px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px #ccc;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: auto;
  img {
    max-width: 120px;
    max-height: 120px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 4px;
`;

const CityWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct,clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const {data:session} = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalcode] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess,setIsSuccess] = useState(false);
  const [shippingFee,setShippingFee] = useState(null);

 async function goToPayment(){
  const response = await axios.post('/api/checkout',{
        name,email,city,street,postalCode,country,
        cartProducts
    });
    if(response.data.url){
        window.location = response.data.url
    }
  }

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
    else{
        setProducts([])
    }
  }, [cartProducts]);

  useEffect(()=>{
     if(window.location.href.includes('success')){
      setIsSuccess(true)
      clearCart()
     }
     axios.get('/api/settings?name=shippingFee').then(response=>{
      setShippingFee(response.data.value);
     })
  },[])

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalcode(response.data.postalCode);
      setStreet(response.data.streetAddress);
      setCountry(response.data.country);
    });
  }, [session]);

  function increaseQuantity(id) {
    addProduct(id);
  }

  function decreaseQuantity(id) {
    removeProduct(id);
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }
  

  if(isSuccess){
    return(
        <>
        <Header/>
        <Center>
            <Box style={{marginTop:'2rem'}}>
                <h1 style={{textAlign:'center'}}>
                    Thank you for your order..
                </h1>
                <p style={{textAlign:'center'}}>We will email you when your order is ready to dispatch</p>
            </Box>
        </Center>
        </>
    )
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
        <RevealWrapper delay={0}>
          <Box>
            <StyledTitle>Cart</StyledTitle>
            {!cartProducts?.length && <div>Your cart is empty!</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product,index) => (
                    <tr key={index}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="product image" />
                        </ProductImageBox>
                        <h5 style={{ textAlign: "center" }}>{product.title}</h5>
                      </ProductInfoCell>

                      <td style={{ textAlign: "center" }}>
                        <Button onClick={() => decreaseQuantity(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {" "}
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => increaseQuantity(product._id)}>
                          +
                        </Button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
              
                <tr>
                  <td colSpan={2}>Products</td>
                  <td></td>
                  <td style={{ textAlign: "center" }}>AED   {productsTotal}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Shipping and handling</td>
                  <td style={{ textAlign: "center" }}>AED   {shippingFee?shippingFee:0}</td>
                </tr>
                <tr>
                  <td colSpan={3}>Total</td>
                  <td style={{ textAlign: "center" }}>AED {Number(productsTotal) + Number(shippingFee)}</td>
                </tr> 
                </tbody>
              </Table>
            )}
          </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100} origin="right">
            <Box>
              <StyledTitle>Order Summary</StyledTitle>
              <Input
                name="name"
                value={name}
                type="text"
                placeholder="Name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                name="email"
                value={email}
                type="text"
                placeholder="Email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <CityWrapper>
                <Input
                  name="city"  
                  value={city}
                  type="text"
                  placeholder="City"
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  name="postalCode"  
                  value={postalCode}
                  type="text"
                  placeholder="Postal Code"
                  onChange={(ev) => setPostalcode(ev.target.value)}
                />
              </CityWrapper>
              <Input
                name="street"
                value={street}
                type="text"
                placeholder="Street Address"
                onChange={(ev) => setStreet(ev.target.value)}
              />
              <Input
                name="country"
                value={country}
                type="text"
                placeholder="Country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              {/* <input type="hidden" name="products" value={cartProducts.join(',')}/> */}
              <Button block black onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
