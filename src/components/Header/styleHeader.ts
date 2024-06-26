import styled, { keyframes } from "styled-components";
import { fadeIn } from "../../styles/styles";

export const HeaderContainerAll = styled.header<{ return: boolean }>`
  width: 100%;
  max-width: 100%;
  height: 80px;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  animation: ${fadeIn} 1s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: ${(props) => (props.return ? `28px 30px` : `0 2rem`)};
  }
  padding: ${(props) => (props.return ? `28px 157px` : `0 10rem`)};
`;

export const BoxAdd = styled.div<{ return: boolean }>`
  width: ${(props) => (props.return ? `92%` : `100%`)};
  min-height: 30px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 425px) {
    flex-direction: column;
    margin-bottom:2rem;
  }

  button {
    width: 12rem;
    height: 2rem;
    background: ${({ theme }) => theme.colors.brandColorDefault};
    border: none;
    border-radius: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap:8px;

    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 1rem;
    color: #ffffff;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const TitleHeader = styled.h5`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.brandColorDefault};
  width: fit-content;
`;

export const BoxRetur = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  img {
    cursor: pointer;
  }
`;

export const AddEnterpriseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0;
`;
