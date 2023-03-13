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
