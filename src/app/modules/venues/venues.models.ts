import { IProduct } from './../products/products.model';
export interface IVenue {
  id?: string;
  name: string;
  location?: string;
  related_products?: IRelatedProduct[];
  contact?: string;
  inspections?: number;
  avg_pass_fail?: number;
  rating?: number;
  contact_person?: string;
  phone?: string;
  contract_count?: number;
}

export interface IvenueProduct {
  id?: string;
  venue?: IVenue;
  product?: IProduct;
  _id?: string;
}

export interface IRelatedProduct {
  cost?: string;
  id?: string;
  pos?:string;
  product_name?: string;
  qty?: string;
}
