import HttpError from '@exceptions/HttpError';
import axios from 'axios';
import { RpmProductsResponse } from './RmpProvider.types';

export default class RpmProvider {
  private urlApiRpm: string;
  private rpmApiKey: string;

  constructor() {
    this.urlApiRpm =
      process.env.RPM_API_URL ?? 'https://api.rpmtelco.com/rpm/api2.svc';
    this.rpmApiKey = process.env.RPM_API_KEY ?? '';
  }

  public async getProducts(processId: string, viewId: string) {
    try {
      const data: RpmProductsResponse[] = await axios
        .post(
          `${this.urlApiRpm}/ProcForms`,
          {
            ProcessID: processId,
            ViewID: viewId,
          },
          {
            headers: { RpmApiKey: this.rpmApiKey },
          },
        )
        .then((response) => response.data.Result.Forms);
      return data;
    } catch {
      throw new HttpError(500, 'Erro ao consultar produtos');
    }
  }

  public async submitForm(payload: object) {
    try {
      return await axios
        .post(`${this.urlApiRpm}/ProcFormAdd`, payload, {
          headers: { RpmApiKey: this.rpmApiKey },
        })
        .then((response) => response.data);
    } catch {
      throw new HttpError(500, 'Erro ao enviar produtos');
    }
  }
}
