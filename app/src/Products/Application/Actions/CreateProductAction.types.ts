export interface IProduct {
  id: number;
  name: string;
  brand: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}
