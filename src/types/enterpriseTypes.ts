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

export interface EnterpriseCreateInputWithAddress
  extends PrismaEnterpriseCreateInput {
  address: PrismaAddressCreateInput;
  name: string;
  purpose: string;
  status: string;
  id?: string;
}

export interface Address {
  district: string;
  city: string;
  street: string;
  state: string;
  cep: string;
}
