import HttpError from '@exceptions/HttpError';
import axios from 'axios';

import { IDistrictResponse, IMunicipalityResponse } from './IBGEService.types';

export default class IBGEService {
  private baseUrl: string;
  constructor() {
    this.baseUrl =
      'http://servicodados.ibge.gov.br/api/v1/localidades/estados/';
  }

  public async getMunicipalities(uf: string) {
    const data: IMunicipalityResponse[] = await axios
      .get(`${this.baseUrl}${uf}/municipios`, { timeout: 5000 })
      .then(response => response.data)
      .catch(error => {
        throw new HttpError(500, error.message);
      });
    return data;
  }

  public async getDistricts(uf: string) {
    const data: IDistrictResponse[] = await axios
      .get(`${this.baseUrl}${uf}/distritos`, { timeout: 5000 })
      .then(response => response.data)
      .catch(error => {
        throw new HttpError(500, error.message);
      });
    return data;
  }
}
