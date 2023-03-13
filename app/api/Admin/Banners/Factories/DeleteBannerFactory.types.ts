export interface IBanner {
  id: number;
  title: string;
  area: string;
  desktop_image: {
    id: number;
    url: string;
  };
  mobile_image: {
    id: number;
    url: string;
  };
  url?: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
}
