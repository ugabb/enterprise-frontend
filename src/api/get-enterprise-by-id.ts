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
  enterprise: EnterpriseWithAddress;
}

export async function getEnterpriseById(id: string) {
    const response = await api.get<GetEnterprisesResponse>(`/enterprise/${id}`);

  return response.data.enterprise;
}
