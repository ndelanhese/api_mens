export interface ICustomerAddressData {
  address: IAddress;
}

export interface IAddress {
  id: number;
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
}

export interface ICustomer {
  id: number;
  name: string;
  cpf: string;
  rg?: string;
  birth_date: Date;
  phone: string;
  status: string;
}
