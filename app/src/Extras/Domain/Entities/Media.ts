import { getYear, getMonth } from '@shared/Date';

import MediaAbstract from '../Abstract/Media';

export default class Media extends MediaAbstract {
  private id?: number;

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
    id?: number,
  ) {
    super(name, mimeType, size, url, extension, path, key, visibility, data);
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setId(id?: number) {
    this.id = id;
    return this;
  }

  public static generatePath(mimeType: string): string {
    const fileType = Media.getFileType(mimeType);
    const year = getYear();
    const month = getMonth();

    return `${fileType}/${year}/${month}`;
  }

  private static getFileType(mimeType: string): string {
    switch (mimeType) {
      case 'image/jpeg':
      case 'image/gif':
      case 'image/png':
      case 'image/svg+xml':
        return 'images';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'text/csv':
      case 'application/csv':
        return 'spreadsheets';
      default:
        return 'files';
    }
  }
}
