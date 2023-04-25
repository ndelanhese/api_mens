import { cpf, cnpj } from 'cpf-cnpj-validator';

export const validateCpf = (value: string) => {
  return cpf.isValid(value);
};

export const formatCpf = (value: string) => {
  return cpf.format(value);
};

export const validateCnpj = (value: string) => {
  return cnpj.isValid(value);
};

export const formatCnpj = (value: string) => {
  return cnpj.format(value);
};
