import { getTime } from '@shared/Date';

export default abstract class Media {
  private static id = 0;
  protected name: string;
  protected mimeType: string;
  protected size: number;
  protected url: string;
  protected extension: string;
  protected path: string;
  protected key: string;
  protected visibility: string;
  protected data: JSON;

  constructor(
    name: string,
    mimeType: string,
    size: number,
    url: string,
    extension: string,
    path: string,
    key: string,
    visibility: string,
    data: JSON,
  ) {
    this.name = name;
    this.mimeType = mimeType;
    this.size = size;
    this.url = url;
    this.extension = extension;
    this.path = path;
    this.key = key;
    this.visibility = visibility;
    this.data = data;
  }

  public static getExtensionFile(path: string): string {
    const extension = /\.([^./]+)$/.exec(path);
    return (extension && extension[1]) || '';
  }

  public static generateKey(name: string, path: string): string {
    return `${path}/${name}`;
  }

  public static generateUniqueName(name: string, extension: string) {
    const slugName = name
      .toLocaleLowerCase()
      .replace(`.${extension}`, '')
      .replace(/[^a-zA-Z0-9]+/g, '-');

    return `${slugName}-${getTime()}.${extension}`;
  }

  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
    this.name = name;
  }

  public getMimeType(): string {
    return this.mimeType;
  }
  public setMimeType(mimeType: string): void {
    this.mimeType = mimeType;
  }

  public getSize(): number {
    return this.size;
  }
  public setSize(size: number): void {
    this.size = size;
  }

  public getUrl(): string {
    return this.url;
  }
  public setUrl(url: string): void {
    this.url = url;
  }

  public getExtension(): string {
    return this.extension;
  }
  public setExtension(extension: string): void {
    this.extension = extension;
  }

  public getPath(): string {
    return this.path;
  }
  public setPath(path: string): void {
    this.path = path;
  }

  public getKey(): string {
    return this.key;
  }
  public setKey(key: string): void {
    this.key = key;
  }

  public getVisibility(): string {
    return this.visibility;
  }
  public setVisibility(visibility: string): void {
    this.visibility = visibility;
  }

  public getData(): JSON {
    return this.data;
  }
  public setData(data: JSON): void {
    this.data = data;
  }
}
