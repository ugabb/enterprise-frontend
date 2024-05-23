import styled, { keyframes } from "styled-components";
import { Select as BaseSelect, Input as BaseInput } from "@material-ui/core";
import { fadeIn } from "../../styles/styles";

export const FormContainer = styled.form`
  display: flex;

  flex-direction: column;
  gap: 11px;

  padding: 1rem;
  margin: 0 auto;
  padding-top: 43px;
  width: 100%;
  max-width: 622px;
  min-height: 606px;

  border-radius: 8px;

  @media screen and (max-width: 768px) {
    padding: 3rem;
  }

  animation: ${fadeIn} 1s ease-in-out;
`;

export const FormularioContainer = styled.div`
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

  /* padding: 32px 0; */
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 24px;
  padding: 32px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.bgWhite};

  input {
    height: 52px;
    width: 100%;
    max-width: 558px;
    font-size: 1rem;
    border-bottom: 2px solid ${({ theme }) => theme.colors.outlineGrayDark};

    &::placeholder {
      color: ${({ theme }) =>
        theme.colors.textColorPrimary}; /* Placeholder text color */
      opacity: 1;
    }
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

  /* Styles for the placeholder text */
  &::placeholder {
    color: red; /* Placeholder text color */
    background-color: blue; /* Placeholder background color */
  }
`;

export const Select = styled(BaseSelect)`
  width: 100%;
  max-width: 558px;
  background-color: white;

  border-bottom: 2px solid ${({ theme }) => theme.colors.outlineGrayDark};
  border-radius: 0;
  transition: 0.4s all;

  .Mui-selected {
    background-color: lightgray;
  }

  .MuiSelect-select {
    padding: 20px 0 !important;
  }

  .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 20px 0 !important;
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

  .MuiSelect-icon {
    color: ${({ theme }) => theme.colors.textColorPrimary};
  }
`;

export const ArrowIcon = styled.img<{ direction: string }>`
  width: 15px;
  height: 8px;
  rotate: ${({ direction }) => (direction === "up" ? "180deg" : "0deg")};
`;

export const CepAddress = styled.p`
  width: 100%;
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
  border-radius: 0;

  &:last-child {
    padding-bottom: 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 38px 0;
`;
