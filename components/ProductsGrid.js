import styled from "styled-components";
import ProductCard from "@/components/ProductCard";
import {RevealWrapper} from 'next-reveal'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({products,wishedProducts=[]}) {
  return (
    <StyledProductsGrid interval={100}>
      {products?.length > 0 && products.map((product,index) => (
        <RevealWrapper key={product._id} delay={index*50}>
          <ProductCard {...product} wished={wishedProducts.includes(product._id)}/>
        </RevealWrapper>
      ))}
    </StyledProductsGrid>
  );
}