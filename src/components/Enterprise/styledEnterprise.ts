import styled from "styled-components";
import { Alert as BaseAlert, Modal as BaseModal } from "@material-ui/core";
import { lighten } from "polished";

export const ContainerHome = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const ContentHome = styled.div`
  width: 100%;
  max-width: 80%;
  height: auto;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3.4rem;
  box-shadow: 0px 2px 4px rgba(48, 46, 69, 0.06);

  @media screen and (min-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: row;
  }

  section {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    p {
      color: rgba(109, 108, 123, 1);
      font-size: 14px;
      font-weight: 400;
      font-family: Inter, sans-serif;
      margin-top: 1rem;

      @media screen and (max-width: 768px) {
        margin-top: 0;
      }
    }
  }
`;

export const ContentStatus = styled.div`
  height: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: rgba(48, 46, 69, 1);
    transition: all 0.2s;

    :hover {
      background: rgba(142, 133, 255, 1);
      color: #fff;
    }

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

export const EnterpriseName = styled.h4`
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: rgba(48, 46, 69, 1);
`;

export const BoxNameEnterprise = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  margin-bottom: 1rem;

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

export const SectionContainer = styled.section`
  display: flex;
 

  @media screen and (min-width: 768px) {
    align-items: end;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Action = styled.div`
  display: flex;
  padding-top: 10px;
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
`;
