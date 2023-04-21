import HttpError from '@exceptions/HttpError';
import axios from 'axios';

import { ICepResponde, ICnpjRequest } from './BasilApiService.types';

export default class BrasilApiService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = 'https://brasilapi.com.br/api';
  }

  public async getAddressByCep(cep: string) {
    const data: ICepResponde = await axios
      .get(`${this.baseUrl}/cep/v2/${cep}`, { timeout: 5000 })
      .then(response => response.data)
      .catch(error => {
        throw new HttpError(error.code, error.message);
      });
    return data;
  }

  public async getCompanyInformationByCep(cnpj: string) {
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
