import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/connectDB";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { styled } from "styled-components";
import {getServerSession} from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";



const StyledTitle = styled.h1`
font-size: 1.em;
`;
export default function Products({products,wishedProducts}){
    return(
        <>
        <Header/>
        <Center>
            <StyledTitle>All Products</StyledTitle>
            <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </Center>
        </>
    )
} 

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedProducts = session?.user
        ? await WishedProduct.find({
            userEmail:session?.user.email,
            product: products.map(p => p._id.toString()),
          })
        : [];
    return {
      props:{
        products: JSON.parse(JSON.stringify(products)),
        wishedProducts: wishedProducts.map(i => i.product.toString()),
      }
    };
  }