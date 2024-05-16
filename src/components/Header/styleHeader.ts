import styled from "styled-components";

export const HeaderContainerAll = styled.header<{ return: boolean }>`
  width: 100%;
  max-width: 100%;
  height: 80px;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${(props) => (props.return ? `28px 157px` : `0 10rem`)};
`;

export const BoxAdd = styled.div<{ return: boolean }>`
  width: ${(props) => (props.return ? `92%` : `100%`)};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 12rem;
    height: 2rem;
    background: ${({ theme }) => theme.colors.brandColorDefault};
    border: none;
    border-radius: 2rem;

    display: flex;
    align-items: center;
    justify-content: space-around;

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
