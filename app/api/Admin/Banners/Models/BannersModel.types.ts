export interface IBannersModelResponse {
  data: {
    id: number;
    order: number;
    title: string;
    area: string;
    url: string;
    start_date: Date;
    end_date: Date;
    status: string;
    desktop_image_id: number;
    mobile_image_id: number;
  }[];
}

export interface IBannerModelResponse {
  id: number;
  order: number;
  title: string;
  area: string;
  url: string;
  start_date: Date;
  end_date: Date;
  status: string;
  desktop_image: {
    id: number;
    url: string;
  };
  mobile_image: {
    id: number;
    url: string;
  };
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

export interface IBannersParams {
  area: string;
  search?: string;
  status?: string;
}

export interface IBannersAreaResponse {
  area: string;
}
