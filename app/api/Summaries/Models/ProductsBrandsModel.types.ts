export interface IProductsBrandsResponse {
  id: number;
  product: {
    id: number;
    brand: {
      id: number;
      name: string;
    };
  };
}
