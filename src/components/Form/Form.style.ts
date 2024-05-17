import styled, { keyframes } from "styled-components";
import { Select as BaseSelect, Input as BaseInput } from "@material-ui/core";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
}
`;


export const FormContainer = styled.div`
  display: flex;

  flex-direction: column;
  gap: 11px;

  padding: 1rem;
  margin: 1rem;
  width: 100%;
  max-width: 622px;
  min-height: 606px;

  background-color: white;

  border-radius: 8px;

  @media screen and (max-width: 768px) {
    padding: 3rem;
  }

  animation: ${fadeIn} 1s ease-in-out;
  
`;

export const Description = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textColorPrimary};

  padding: 32px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  input {
    height: 52px;
    width: 100%;
    max-width: 558px;
    font-size: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.outlineGrayDark};
  }
`;

export const Input = styled(BaseInput)`
  /* Remove the default underline */
  &.MuiInput-underline:before {
    content: none;
  }
  &.MuiInput-underline:after {
    content: none;
  }
  &.MuiInput-underline:hover:not(.Mui-disabled):before {
    content: none;
  }
`;

export const Select = styled(BaseSelect)`
  /* Add your styles here */
  width: 100%;
  max-width: 558px;
  background-color: white;

  border-bottom: 2px solid ${({ theme }) => theme.colors.outlineGrayDark};
  border-radius: 0;

  /* Style the selected option */
  .Mui-selected {
    background-color: lightgray;
  }

  &.MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    fieldset {
      border: none;
    }
  }

  /* Style the dropdown icon */
  .MuiSelect-icon {
    color: ${({ theme }) => theme.colors.textColorPrimary};
  }
`;

export const CepAddress = styled.p`
  width: 100%;
  padding: 0 32px;
  margin: 21px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textColorPrimary};
  font-weight: 400;
`;

export const SpanError = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
`;
