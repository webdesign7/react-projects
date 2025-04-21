import {styled} from "styled-components";

const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: #1f2937;
  background-color: #f0b322;
  border: none;
    &:hover {
      background-color: #f0920e;
    } 
    &:active {
        background-color: #1e40af;
    }
    `;

export default Button;