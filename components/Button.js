import { primary } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  font-size:12px;
  svg{
    height:16px;
    margin-right: 5px;
  }
  ${props=>props.block && css`
    display: block;
    width: 100%;
  `}
  ${(props) =>
    props.white && !props.outline &&
    css`
      background-color: #FFF;
      color: #000;
    `}
    ${(props) =>
    props.white && props.outline &&
    css`
      background-color: transparent;
      color: #FFF;
      border:2px solid #FFF;
    `}
    ${(props) =>
    props.black && !props.outline &&
    css`
      background-color: #000;
      color: #FFF;
    `}
    ${(props) =>
    props.black && props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border:2px solid #000;
    `}
  ${(props) =>
    props.primary && !props.outline &&
    css`
      background-color: ${primary};
      border:2px solid ${primary};
      color: #fff;
    `}
    ${(props) =>
    props.primary && props.outline &&
    css`
      background-color: transparent;
      border:2px solid ${primary};
      color: ${primary};
    `}
  ${(props) =>
    props.size === "lg" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg{
        height: 22px;
      }
    `}
`;
 export const StyledBtton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledBtton {...rest}>{children}</StyledBtton>;
}
