import { styled } from "styled-components";
import Center from "./Center";
import ProductCard from "./ProductCard";
import { RevealWrapper } from "next-reveal";
import ProductsGrid from "@/components/ProductsGrid";

// const ProductsGrid = styled.div`
// display: grid;
// grid-template-columns: 1fr 1fr 1fr 1fr;
// gap: 20px;
// padding-top: 2rem;
// `; 

const StyledTitle = styled.h2`
font-size: 2rem;
text-align: center;
margin: 2rem 0 1.25rem;

`;
export default function NewProducts({products,wishedProducts}){
 
    return(
        <Center>
            <StyledTitle>New Arrivals</StyledTitle>
        {/* <ProductsGrid>
            {products.length>0 && products.map((product,index)=>(
                 <RevealWrapper key={product._id} delay={index*50}>
                <ProductCard key={product._id} {...product}/>
                </RevealWrapper>
            ))}
        </ProductsGrid> */}
         <ProductsGrid products={products} wishedProducts={wishedProducts} />
        </Center>
    )
}