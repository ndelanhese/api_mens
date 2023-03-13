import HttpError from '@exceptions/HttpError';

import * as redis from 'redis';

export const createCacheClient = () => {
  const host = process.env.REDIS_HOST;
  const port = Number(process.env.REDIS_PORT);
  const password = process.env.REDIS_PASSWORD;

  const client = redis.createClient({
    socket: {
      host,
      port,
    },
    password,
  });

  client.on('error', (err) => {
    throw new HttpError(500, `Erro no servidor ${err}`);
  });
  client.connect();
  return client;
};

export const createCache = async (
  client: any,
  key: string,
  data: any,
): Promise<boolean> => {
  const SEVEN_MINUTES_IN_SECONDS = 420;
  try {
    const cache = await client.set(key, JSON.stringify(data), {
      EX: SEVEN_MINUTES_IN_SECONDS,
      NX: true,
    });
    return cache === 'OK' ? true : false;
  } catch {
    throw new HttpError(500, `Erro no serviço de cache`);
  }
};

export const getCache = async (
  client: any,
  key: string,
): Promise<object | boolean> => {
  try {
    const cache = await client.get(key);
    return cache ? JSON.parse(cache) : false;
  } catch {
    throw new HttpError(500, `Erro no serviço de cache`);
  }
};

export const flushCache = async (client: any): Promise<boolean> => {
  try {
    const cache = await client.flushAll();
    return cache === 'OK' ? true : false;
  } catch {
    throw new HttpError(500, `Erro no serviço de cache`);
  }
};

export const deleteCache = async (
  client: any,
  keyPath: string,
): Promise<void> => {
  const keysFromPath = await keys(client, keyPath);
  if (keysFromPath.length > 0) {
    await client.del(keysFromPath);
  }
};

const keys = async (client: any, keyPath: string): Promise<string[]> => {
  return await client.keys(`*${keyPath}*`);
};
