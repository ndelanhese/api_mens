import { getCurrentDateUS } from '@shared/Date';
import { IPayloadRpmPattern } from './CreateGoToEstimate.types';

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
        Value: '',
        ID: '185',
      },
      {
        Field: 'Linha',
        Value: '',
        ID: '121',
      },
      {
        Field: 'Quantidade Linhas',
        Value: '',
      },
      {
        Field: 'Valor Total Negociado para Linhas',
        Value: '',
      },
      {
        Field: 'Portabilidade',
        Value: 'no',
      },
      {
        Field: 'Nome da Operadora da qual está Portando',
        Value: '',
      },
      {
        Field: 'Números a Serem Portados',
        Value: '',
      },
      {
        Field: 'Locação de Aparelhos',
        Value: '',
      },
      {
        Field: 'Duração do Contrato',
        Value: '',
      },
      {
        Field: 'Instruções Especiais',
        Value: '',
      },
      {
        Field: 'Categoria',
        Value: '',
      },
    ],
  },
};

export const fieldsPositions = {
  proposalAssignedToPosition: 0,
  typePosition: 1,
  sentDatePosition: 2,
  companyNamePosition: 3,
  cnpjPosition: 4,
  representativePosition: 5,
  representativePhonePosition: 6,
  representativeEmailPosition: 7,
  hasDoneBusinessPosition: 8,
  customerNamePosition: 9,
  customerCnpjPosition: 10,
  customerIePosition: 11,
  billingPhonePosition: 12,
  billingEmailPosition: 13,
  sameBillingInstallationAddressPosition: 14,
  installationCepPosition: 15,
  installationStreetPosition: 16,
  installationNumberPosition: 17,
  installationComplementPosition: 18,
  installationDistrictPosition: 19,
  installationCityPosition: 20,
  installationStatePosition: 21,
  technicalRepresentativeNamePosition: 22,
  technicalRepresentativeRolePosition: 23,
  technicalRepresentativeEmailPosition: 24,
  technicalRepresentativePhonePosition: 25,
  supplierPosition: 26,
  linePosition: 27,
  lineQuantityPosition: 28,
  totalNegotiatedValuePosition: 29,
  portabilityPosition: 30,
  portabilityOperatorNamePosition: 31,
  portabilityNumbersPosition: 32,
  deviceLeasingPosition: 33,
  contractDurationPosition: 34,
  specialInstructionsPosition: 35,
  categoryPosition: 36,
};

export default payloadEstimate;
