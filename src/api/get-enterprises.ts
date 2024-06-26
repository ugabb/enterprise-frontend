import { api } from "../lib/axios";

export type EnterpriseWithAddress = {
  address: {
    id: string;
    district: string;
    city: string;
    street: string;
    state: string;
    number: string;
    cep: string;
  };
} & {
  id: string;
  name: string;
  status: "SOON_RELEASE" | "RELEASE" | "iN_PROGRESS" | "READY";
  purpose: "residencial" | "commercial";
  ri_number: string;
  addressId: string;
};

interface GetEnterprisesResponse {
  enterprises: EnterpriseWithAddress[];
}

export async function getEnterprises() {
  const response = await api.get<GetEnterprisesResponse>(
    "/enterprise"
  );

  return response.data.enterprises;
}
