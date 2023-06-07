export interface IProductsCategoriesResponse {
  id: number;
  product: {
    id: number;
    category: {
      id: number;
      name: string;
    };
  };
}
