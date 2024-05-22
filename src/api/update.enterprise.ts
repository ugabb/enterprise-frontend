import { api } from "../lib/axios";
import { EnterpriseCreateInputWithAddress } from "../types/enterpriseTypes";

export async function updateEnterprise(
  data: EnterpriseCreateInputWithAddress
) {
  const response = await api.put(`/enterprise/${data.id}`, data);
  console.log(response);

  return response.data;
}
