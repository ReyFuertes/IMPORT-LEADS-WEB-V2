export interface IProduct {
  _id?: string;
  id?: string;
  product_name?: any;
  qty?: any;
  cost?: any;
  sub_products?: IProduct[];
  parent?: any;
  pos?: number;
  child_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
