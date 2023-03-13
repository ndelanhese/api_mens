import { getCurrentDateUS } from '@shared/Date';
import { IPayloadRpmPattern } from './CreateCyberpassEstimate.types';

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
        Field: 'Categoria',
        Value: '',
      },
      {
        Field: 'Fornecedor',
        Value: '',
        ID: '1839',
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
        Field: 'Valor de Instalação',
        Value: '',
      },
    ],
  },
};

export const fieldsPositions = {
  assignedProposalFor: 0,
  type: 1,
  requestSentDate: 2,
  channelCompanyName: 3,
  channelCNPJ: 4,
  channelRepresentative: 5,
  channelRepresentativeContactPhone: 6,
  channelRepresentativeContactEmail: 7,
  hasDoneBusinessWithScanSource: 8,
  clientCompanyName: 9,
  clientCNPJ: 10,
  clientStateRegistration: 11,
  billingContactPhone: 12,
  billingContactEmail: 13,
  isBillingSameAsInstallationAddress: 14,
  installationAddressCEP: 15,
  installationAddressStreet: 16,
  installationAddressNumber: 17,
  installationAddressComplement: 18,
  installationAddressNeighborhood: 19,
  installationAddressCity: 20,
  installationAddressState: 21,
  clientTechnicalRepresentativeName: 22,
  clientTechnicalRepresentativePosition: 23,
  clientTechnicalRepresentativeEmail: 24,
  clientTechnicalRepresentativeContactPhone: 25,
  category: 26,
  supplier: 27,
  contractDuration: 28,
  specialInstructions: 29,
  installationValue: 30,
};

export default payloadEstimate;
