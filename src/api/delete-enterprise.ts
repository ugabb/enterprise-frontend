import { api } from "../lib/axios";

export async function deleteEnterpriseById(id: string) {
  const response = await api.delete<void>(`/enterprise/${id}`);

  return response;
}
