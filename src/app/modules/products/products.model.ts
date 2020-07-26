export interface IProduct {
  _id?: string;
  id?: string;
  product_name?: string | any;
  qty?: string | number;
  cost?: string | number;
  sub_products?: IProduct[];
  parent?: IProduct | any;
  pos?: number;
  child_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
