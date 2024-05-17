import styled from "styled-components";
import { Select as BaseSelect, Input as BaseInput } from "@material-ui/core";

export const FormContainer = styled.div`
  display: flex;

  flex-direction: column;
  gap: 11px;

  width: 622px;
  height: 606px;

  background-color: white;

  border-radius: 8px;
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

  input {
    height: 52px;
    width: 558px;
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

  input::placeholder {
    color: ${({ theme }) => theme.colors.textColorPrimary};
  }
`;

export const Select = styled(BaseSelect)`
  /* Add your styles here */
  width: 558px;
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

  .MuiSelect-root::placeholder {
    color: ${({ theme }) => theme.colors.textColorPrimary};
  }
`;

export const CepAddress = styled.p`
  width: 100%;
  padding: 0 32px;
  margin: 42px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textColorPrimary};
  font-weight: 400;
`;
