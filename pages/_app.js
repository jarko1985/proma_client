import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";
import {SessionProvider} from 'next-auth/react'; 

const GlobalStyles = createGlobalStyle`

body{
  @import url('https://fonts.googleapis.com/css2?family=Tajawal&display=swap');
  padding:0;
  margin:0;
  font-family: 'Tajawal', sans-serif;
  background-color: #EEE;
}
`;

export default function App({ Component, pageProps:{session,...pageProps} }) {
  
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
      <CartContextProvider>
      <Component {...pageProps} />
      </CartContextProvider>
      </SessionProvider>
    </>
  );
}
