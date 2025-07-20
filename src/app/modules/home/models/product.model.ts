export interface Product {
  titulo: string;
  precio: number;
  rating: number;
  reviews: number;
  fuente: string;
  link: string | null;
  imagen: string;
}

export interface ApiResponseProducts {
  products: Product[];
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
