export interface IVenue {
  id?: string;
  name: string;
  location?: string;
  related_products?: IRelatedProduct[];
  contact?: string;
  inspections?: number;
  avg_pass_fail?: number;
  rating?: number;
  contracts?: string;
  contact_person?: string;
  phone?: string;
}

export interface IRelatedProduct {
  cost?: string;
  id?: string;
  pos?:string;
  product_name?: string;
  qty?: string;
}
