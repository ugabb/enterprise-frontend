import { api } from "../lib/axios";
import { EnterpriseCreateInputWithAddress } from "../types/enterpriseTypes";


export async function registerEnterprise(
  data: EnterpriseCreateInputWithAddress
) {
  const response = await api.post("/enterprise", data);
  console.log(response);

  return response.data;
}
