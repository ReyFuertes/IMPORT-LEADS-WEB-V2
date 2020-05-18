export interface IProduct {
  _id?: string;
  id?: string;
  product_name?: string | any;
  qty?: string | number;
  cost?: string | number;
  sub_products?: IProduct[];
  parent?: IProduct | any;
  pos?: number;
  created_at?: Date;
  updated_at?: Date;
}
