export interface product {
  id: number;
  name: string;
  price?: number;
  children?: product[]
}

export interface displayedProduct {
  id: number;
  name: string;
  price?: number;
  maxChildPrice?: number;
  children?: displayedProduct[]
}

export interface User {
  name: string;
  endpoint: string;
  hits: number;
  endpoints: Map<string, number>;
}
