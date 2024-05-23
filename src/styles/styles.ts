
import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
}
`;


// search input
export const ContainertLupa = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;

  animation: ${fadeIn} 1s ease-in-out;
  
`;

export const ContentLupa = styled.div`
  width: 80%;
  height: 2.5rem;

  input {
    border: none;
    width: 90%;
    height: 100%;
    margin-left: 5px;
    right: 0;
  }

  div {
    height: 100%;
    display: flex;
    cursor: pointer;

    img {
      margin-right: 1.4rem;
    }

    p {
      font-family: Inter, sans-serif;
      font-weight: 400;
      font-size: 1rem;
      color: #302e45;
    }
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:33px;
  padding: 48px 0;
`;