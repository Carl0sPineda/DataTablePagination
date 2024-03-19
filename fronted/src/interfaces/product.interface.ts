export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  model_year: string;
  quantity: number;
  color: string;
  availability: boolean;
  createdAt: string;
}

export interface Products {
  products: Product[];
  totalPages: number;
}
