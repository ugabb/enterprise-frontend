import { api } from "../lib/axios";

// export type EnterpriseWithAddress = {
//   address: {
//     id?: string;
//     district: string;
//     city: string;
//     street: string;
//     state: string;
//     number: string;
//     cep: string;
//   };
// } & {
//   id?: string;
//   name: string;
//   status: string;
//   purpose: string;
//   ri_number?: string;
//   addressId: string;
// };

interface PrismaEnterpriseCreateInput {
  id?: string;
  name: string;
  status: string;
  purpose: string;
  ri_number: string;
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

export async function registerEnterprise(
  data: EnterpriseCreateInputWithAddress
) {
  const response = await api.post("/enterprise", data);
  console.log(response);

  return response.data;
}
