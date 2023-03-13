import fileUpload from 'express-fileupload';

export interface IBanners {
  order?: number;
  title?: string;
  area?: string;
  desktop_image?: fileUpload.UploadedFile;
  mobile_image?: fileUpload.UploadedFile;
  url?: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
}

export interface IBannerModelResponseWithMedia {
  id: number;
  order: number;
  title: string;
  area: string;
  url: string;
  start_date: Date;
  end_date: Date;
  status: string;
  desktop_image: IMedia;
  mobile_image: IMedia;
}

interface IMedia {
  id: number;
  name: string;
  path: string;
  key: string;
  url: string;
  mimetype: string;
  extension: string;
  size: number;
  visibility: string;
  data: JSON;
}
