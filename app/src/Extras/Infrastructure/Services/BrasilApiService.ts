import HttpError from '@exceptions/HttpError';
import axios from 'axios';

import { ICepResponde, ICnpjRequest } from './BasilApiService.types';

export default class BrasilApiService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = 'https://brasilapi.com.br/api';
  }

  public async getAddressByCep(cep: string) {
    const ONLY_NUMBER_CEP = cep.replace(/\D/g, '');
    const data: ICepResponde = await axios
      .get(`${this.baseUrl}/cep/v1/${ONLY_NUMBER_CEP}`, { timeout: 5000 })
      .then(response => response.data)
      .catch(() => null);
    return data;
  }

  public async getCompanyInformationByCnpj(cnpj: string) {
    const data: ICnpjRequest = await axios
      .get(`${this.baseUrl}#tag/BANKS/cnpj/v1/${cnpj}`, {
        timeout: 5000,
      })
      .then(response => response.data)
      .catch(error => {
        throw new HttpError(error.code, error.message);
      });
    return data;
  }
}
