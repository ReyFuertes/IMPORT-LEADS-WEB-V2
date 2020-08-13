import { ITag } from './../tags/tags.model';
import { IProduct } from './../products/products.model';
import { IUser } from './../../models/user.model';
export interface IContractTermProduct {
  term_id?: string;
  product_id?: string;
  category_id?: string;
  contract_id?: string;
}
export interface ISavedChecklistItem extends ISavedChecklist {
  checklist_items?: {
    id?: string;
    checklist_contract?: string;
    saved_checklist_item?: string;
  }
}
export interface ISavedChecklistPayload extends ISavedChecklist {
  checklist_items?: string[]
}
export interface ICommonIdPayload {
  id: string,
  _id: string
}
export interface ISavedChecklist extends ICoreModel {
  checklist_name?: string;
  assigned_to?: string;
  desired_run_date?: string;
}
export interface ISavedChecklistItem {
  id?: string;
  contract_checklist_id?: string;
  saved_checklist_id?: string;
}
export interface IOverrideChecklistItem {
  source: IContractChecklistItem;
  destination: IContractChecklistItem;
}
export interface IContractCategoryTerm {
  category_id?: string;
  term_id?: string;
  checked: boolean;
}
export interface IContractChecklistItem extends IChecklist {
  checklist_product?: { id?: string, product?: IProduct };
}
export interface IContractChecklist extends IChecklist {
  checklist_product?: { id: string }[];
}
export interface IChecklist extends ICoreModel {
  checklist_contract?: { id: string };
  checklist_term?: { id: string };
  checklist_category?: { id: string };
  session_id?: string;
}
export interface IContractTerm extends ICoreModel {
  term_name?: string;
  term_description?: string;
  contract_category?: IContractCategory;
  contract_tag?: ITag
}
export interface IContractCategory extends ICoreModel {
  category?: ICategory;
  contract?: IContract;
  terms?: IContractTerm[];
}
export interface ICategory extends ICoreModel {
  category_name: string;
}
export interface IContractProduct extends ICoreModel {
  _id?: string;
  parent?: IProduct
  sub_products?: IProduct[],
  contract?: IContract;
}
export interface IProductImage extends ICoreModel {
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
export interface IContract extends ICoreModel {
  contract_name: string;
  venue?: any;
  start_date?: Date | string;
  delivery_date?: Date | string;
  details?: string;
  attachments?: any[];
  images?: IProductImage[];
  user?: IUser;
  contract_products?: IProduct[]
}
export interface ICoreModel {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
}
