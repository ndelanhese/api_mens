export interface ISupplier {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
  status: string;
  supplier_addresses: {
    address: IAddress;
  }[];
}

interface IAddress {
  id: number;
  address: string;
  number: string;
  district: string;
  postal_code: string;
  city: string;
  state: string;
}
