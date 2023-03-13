import { getCurrentDateUS } from '@shared/Date';
import { IPayloadRpmPattern } from './CreateEquinixEstimate.types';

const payloadEstimate: IPayloadRpmPattern = {
  ProcessID: '97',
  Form: {
    Fields: [
      {
        Field: 'Proposta Atribuída Para',
        Value: 'Cristina Pereira',
      },
      {
        Field: 'Tipo',
        Value: 'Pedido',
      },
      {
        Field: 'Data de Envio do Pedido',
        Value: getCurrentDateUS(),
      },
      {
        Field: 'Razão Social do Canal',
        Value: '',
      },
      {
        Field: 'CNPJ do Canal',
        Value: '',
      },
      {
        Field: 'Representante do Canal',
        Value: '',
      },
      {
        Field: 'Telefone de Contato com o Representante',
        Value: '',
      },
      {
        Field: 'Email de Contato com o Representante',
        Value: '',
      },
      {
        Field: 'Já realizou negócios com ScanSource?',
        Value: '',
      },
      {
        Field: 'Razão Social do Cliente',
        Value: '',
      },
      {
        Field: 'CNPJ do Cliente',
        Value: '',
      },
      {
        Field: 'Inscrição Estadual do Cliente',
        Value: '',
      },
      {
        Field: 'Principal Telefone para Cobrança',
        Value: '',
      },
      {
        Field: 'Principal Email para Cobrança',
        Value: '',
      },
      {
        Field: 'Endereço de Cobrança é o mesmo de Instalação?',
        Value: '',
      },
      {
        Field: 'CEP - Instalação',
        Value: '',
      },
      {
        Field: 'Rua/Avenida - Instalação',
        Value: '',
      },
      {
        Field: 'Número - Instalação',
        Value: '',
      },
      {
        Field: 'Complemento - Instalação',
        Value: '',
      },
      {
        Field: 'Bairro - Instalação',
        Value: '',
      },
      {
        Field: 'Cidade - Instalação',
        Value: '',
      },
      {
        Field: 'Estado - Instalação',
        Value: '',
      },
      {
        Field: 'Nome do Representante Técnico do Cliente',
        Value: '',
      },
      {
        Field: 'Cargo do Representante Técnico do Cliente',
        Value: '',
      },
      {
        Field: 'Email de Contato com o Representante Técnico',
        Value: '',
      },
      {
        Field: 'Telefone de Contato com o Representante Técnico',
        Value: '',
      },
      {
        Field: 'Fornecedor',
        Value: '3',
        ID: '1839',
      },
      {
        Field: 'Categoria',
        Value: 'Data Center',
      },
      {
        Field: 'Duração do Contrato',
        Value: '',
      },
      { Field: 'Instruções Especiais', Value: '' },
      { Field: 'Valor de Instalação', Value: '' },
    ],
  },
};

export const fieldsPositions = {
  companyNamePosition: 3,
  cnpjPosition: 4,
  representativePosition: 5,
  representativePhonePosition: 6,
  representativeEmailPosition: 7,
  contractDurationPosition: 28,
  specialInstructionsPosition: 29,
  installPricePosition: 30,
};

export default payloadEstimate;
