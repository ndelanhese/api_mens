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
}
