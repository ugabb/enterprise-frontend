import styled from "styled-components";
import { Alert as BaseAlert, Modal as BaseModal } from "@material-ui/core";
import { lighten } from "polished";

export const ContainerHome = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

export const ContentHome = styled.div`
  width: 80%;
  height: 8rem;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3.4rem;
  box-shadow: 0px 2px 4px rgba(48, 46, 69, 0.06);

  section {
    display: flex;
    justify-content: space-between;
    width: 100%;

    p {
      color: rgba(109, 108, 123, 1);
      font-size: 14px;
      font-weight: 400;
      font-family: Inter, sans-serif;
    }
  }

  div {
    display: flex;
    justify-content: end;
  }
`;
export const ContentStatus = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 25px;
    width: fit-content;
    padding: 8px 24px;
    border: 1px solid rgba(142, 133, 255, 1);
    border-radius: 71px;

    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 12px;
    color: rgba(48, 46, 69, 1);
    transition: all 0.2s;

    :hover {
      background: rgba(142, 133, 255, 1);
      color: #fff;
    }
  }
`;

export const BoxNameEnterprise = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 1rem;

  span {
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #302e45;
    margin-right: 1.2rem;
  }

  img {
    cursor: pointer;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }

    & + img {
      margin-left: 0.75rem;
    }
  }
`;

export const Action = styled.div`
  display: flex;
  gap: 10px;
`;
export const Icon = styled.img`
  height: 18px;
  width: 18px;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Modal = styled(BaseModal)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Alert = styled(BaseAlert)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  button {
    margin: 0 1rem;
  }

  button:first-child {
    border: 1px solid #ef5350;
    color: #ef5350;
    padding: 8px;

    :hover {
      background-color: #ef5350;
      color: ${({ theme }) => theme.colors.bgWhite};
    }
  }
  button:last-child {
    padding: 8px;
    color: #ef5350;
    :hover {
      background-color: #ef5350;
      color: ${({ theme }) => theme.colors.bgWhite};
    }
  }

  div {
    margin: 0 auto;
  }
`;
