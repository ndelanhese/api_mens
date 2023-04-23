export interface ICustomer {
  id: number;
  name: string;
  cpf: string;
  rg?: string;
  birth_date: Date;
  phone: string;
  status: string;
  addresses: {
    address: IAddress;
  }[];
}

interface IAddress {
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
}
