import HttpError from '@exceptions/NotAuthorizedHttpError';
import { IUserMyScanSourceDataToken } from '@app/src/Shared/Domain/Services/Token/Token.types';
import Token from '@app/src/Shared/Domain/Services/Token/Token';
import {
  createCache,
  createCacheClient,
  deleteCache,
  flushCache,
  getCache,
} from '@cache/Cache';

export default class BaseController {
  protected getUser(token?: string): IUserMyScanSourceDataToken {
    if (!token) throw new HttpError('Não autorizado');
    const user = Token.deserializeMyScanSourceToken(token);
    return {
      cnpj: user.cnpj,
      company: user.company,
      companyCode: user.companyCode,
      email: user.email,
      login: user.login,
      name: user.name,
      resale: user.resale,
      token: user.token,
      userCode: user.userCode,
    };
  }

  protected async getCache(key: string): Promise<boolean | object> {
    const cacheClient = this.createNewCacheClient();
    const cache = await getCache(cacheClient, key);
    return cache;
  }

  protected async createCache(key: string, data: object) {
    const cacheClient = this.createNewCacheClient();
    await createCache(cacheClient, key, data);
  }

  protected async deleteCache(key: string) {
    const cacheClient = this.createNewCacheClient();
    await deleteCache(cacheClient, key);
  }

  protected async flushCache() {
    const cacheClient = this.createNewCacheClient();
    await flushCache(cacheClient);
  }

  private createNewCacheClient() {
    return createCacheClient();
  }
}
