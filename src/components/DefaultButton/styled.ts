import styled from "styled-components";
import { shade, lighten } from "polished";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 40px;
  background-color: ${({ theme }) => theme.colors.brandColorDefault};
  color: ${({ theme }) => theme.colors.bgWhite};
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 71px;
  height: 36px;
  width: fit-content;
`;
