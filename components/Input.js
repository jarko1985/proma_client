const { styled } = require("styled-components");

const StyledInput = styled.input`
width: 100%;
padding: 8px;
margin-bottom: 5px;
border: 1px solid #CCC;
border-radius: 5px;
box-sizing: border-box;

`;

export default function Input(props){
    return  <StyledInput {...props}/>
}