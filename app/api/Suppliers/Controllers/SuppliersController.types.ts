export interface ISupplierAddressData {
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

export interface ISupplier {
  id: number;
  contact_name: string;
  corporate_name: string;
  cnpj: string;
  status: string;
}
