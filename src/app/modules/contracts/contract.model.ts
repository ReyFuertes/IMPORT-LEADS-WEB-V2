import { ITag } from './../tags/tags.model';
import { IProduct } from './../products/products.model';
import { IUser } from './../../models/user.model';

export interface IContractCategoryTerm {
  category_id: string;
  term_ids?: string[];
}

export interface IContractChecklist {
  id?: string;
  contract_product_ids: string[];
  contract_category_term?: IContractCategoryTerm[];
}
export interface IContractTerm {
  id?: string;
  term_name?: string;
  term_description?: string;
  contract_category?: IContractCategory;
  contract_tag?: ITag
}
export interface IContractCategory {
  id?: string;
  category?: ICategory;
  contract?: IContract;
  terms?: IContractTerm[];
}
export interface ICategory {
  id?: string;
  category_name: string;
}

export interface IContractProduct {
  _id?: string;
  id?: string;
  parent?: IProduct
  sub_products?: IProduct[],
  contract?: IContract;
}
export interface IProductImage {
  id?: string;
  image?: any;
  filename?: string;
  position?: number;
  file?: File;
  size?: any;
  mimetype?: string;
  contractId?: string;
}

export enum PillState {
  default = 0,
  reset = 1
}
export interface IContract {
  id?: string;
  contract_name: string;
  venue?: any;
  start_date?: Date | string;
  delivery_date?: Date | string;
  details?: string;
  attachments?: any[];
  images?: IProductImage[];
  created_at?: Date;
  updated_at?: Date;
  user?: IUser;
  contract_products?: IProduct[]
}
