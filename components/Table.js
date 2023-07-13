const { styled } = require("styled-components");

const StyledTable = styled.table`
width: 100%;
th{
    text-transform: uppercase;
    color: #AAA;
    font-size: 0.7rem;
}
`;

export default function Table(props){
    return <StyledTable {...props}/>
}