import { writeFile, rm, mkdirSync } from 'node:fs';
import path from 'path';
import Media from '../../Domain/Entities/Media';

export default class LocalStorage {
  createLocalStorage = async (media: Buffer, key: string): Promise<string> => {
    const mediaPath = './storage/app/public/';
    const keyDir = path.dirname(key);
    const url = process.env.STORAGE_URL;

    mkdirSync(`${mediaPath}${keyDir}`, { recursive: true });
    writeFile(`${mediaPath}${key}`, media, () => {});
    return `${url}${key}`;
  };

  deleteLocalStorage = (media: Media) => {
    const mediaPath = './storage/app/public/';
    rm(`${mediaPath}${media.getKey()}`, () => {});
  };
}
