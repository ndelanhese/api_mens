import checkPermission from '@acl/AclMiddleware';
import Token from '@app/src/Shared/Domain/Services/Token/Token';
import { IUserAdminDataToken } from '@app/src/Shared/Domain/Services/Token/Token.types';
import {
  createCache,
  createCacheClient,
  getCache,
  deleteCache,
  flushCache,
} from '@cache/Cache';
import NotAuthorizedHttpError from '@exceptions/NotAuthorizedHttpError';
import { Request } from 'express';

export default class BaseController {
  protected getUser(token?: string): IUserAdminDataToken {
    if (!token) throw new NotAuthorizedHttpError();
    const user = Token.deserializeAdminToken(token);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  protected async verifyPermission(req: Request, permission: string) {
    const { authorization } = req.headers;
    if (!authorization) throw new NotAuthorizedHttpError();
    await checkPermission(authorization, permission);
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
