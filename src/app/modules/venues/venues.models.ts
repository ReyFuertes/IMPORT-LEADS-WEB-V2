export interface IVenue {
  id?: string | number;
  name: string;
  location?: string;
  related_products?: IRelatedProduct[];
  contact?: string;
  inspections?: number;
  avg_pass_fail?: number;
  rating?: number;
  contracts?: string;
}

export interface IRelatedProduct {
  cost?: string;
  id?: string;
  pos?:string;
  product_name?: string;
  qty?: string;
}

export interface IVenuesAddress {
  id: number;
  name: string;
  location: string;
  contactPerson: string;
  phone: string;
}
