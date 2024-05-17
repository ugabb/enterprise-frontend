import { api } from "../lib/axios";

interface PrismaEnterpriseCreateInput {
  id?: string;
  name: string;
  status: string;
  purpose: string;
  ri_number?: string;
}

interface PrismaAddressCreateInput {
  id?: string;
  district: string;
  city: string;
  street: string;
  state: string;
  number: string;
  cep: string;
}

interface EnterpriseCreateInputWithAddress extends PrismaEnterpriseCreateInput {
  address: PrismaAddressCreateInput;
}

export async function updateEnterprise(
  data: EnterpriseCreateInputWithAddress
) {
  const response = await api.put(`/enterprise/${data.id}`, data);
  console.log(response);

  return response.data;
}
