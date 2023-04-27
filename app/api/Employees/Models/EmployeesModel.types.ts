export interface IEmployee {
  id: number;
  name: string;
  cpf: string;
  rg?: string;
  birth_date: Date;
  phone: string;
  pis_pasep: string;
  admission_date: Date;
  resignation_date?: Date;
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
