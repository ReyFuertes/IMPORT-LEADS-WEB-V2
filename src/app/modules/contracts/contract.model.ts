import { ITag } from './../tags/tags.model';
import { IProduct } from './../products/products.model';
import {  IUser } from '../user-management/user-mgmt.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';

export interface ICategoryContract {
  id?: string;
  category_name?: string;
  contract?: any;
}
export interface IContractCategoryTemplate {
  id?: string;
  contract?: any;
  category?: ICategory;
  contract_category?: IContractCategory;
  category_template?: ICategoryTemplate;
}
export interface ICategoryTemplate {
  id?: string;
  title?: string;
  description?: string;
  contract?: any;
  category?: ICategory;
  contract_category?: IContractCategory
}
export interface IContractTemplate {
  id?: string;
  title?: string;
  description?: string;
  contract?: IContract;
}
export interface IContractTemplatePayload {
  id?: string;
  title?: string;
  description?: string;
  contract?: { id: string };
}
export interface IContractCategoryReponse {
  category?: { id: string, category_name: string }
  category_id?: string,
  contract: { id: string, contract_name: string }
  created_at?: string,
  id?: string,
  position: 3
  terms: [{ id?: string, term_name?: string, }]
  updated_at?: string,
}
export enum ProductStatusType {
  Override = 1,
  Apply = 2
}
export interface IContractTermProduct {
  term_id?: string;
  product_id?: string;
  category_id?: string;
  contract_id?: string;
}
export interface ISavedChecklistItem extends ISavedChecklist {
  id?: string;
  saved_checklist?: string;
}
export interface ISavedChecklistResponse extends ISavedChecklist {
  checklist_items?: IContractChecklistItem[];
  checklist_contract?: { id: string };
}
export interface ISavedChecklistPayload extends ISavedChecklist {
  checklist_items?: IContractChecklistItem[];
  checklist_contract?: { id: string };
  user?: IUser;
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
  contract_product?: { id?: string, product?: IProduct };
  user?: IUser;
}
export interface IContractChecklist extends IChecklist {
  checklist_product?: { id: string }[];
  created_at?: string;
  updated_at?: string;
}
export interface IChecklist extends ICoreModel {
  contract_contract?: { id: string };
  contract_term?: { id: string };
  contract_category?: { id: string };
}
export interface IContractTerm extends ICoreModel {
  term_name?: string;
  term_description?: string;
  contract_category?: IContractCategory;
  contract_tag?: ITag;
  verification?: string;
}
export interface IContractCategory extends ICoreModel {
  category?: ICategory;
  contract?: IContract;
  terms?: IContractTerm[];
  contract_category?: IContractCategory
}
export interface ICategory extends ICoreModel {
  category_name: string;
  contracts?: any[]
}
export interface IContractProduct extends ICoreModel {
  _id?: string;
  parent?: IProduct
  sub_products?: IProduct[],
  contract?: IContract;
  child_id?: string;
  cost?: string;
  created_at?: string;
  parent_id?: string;
  product?: {
    id?: string;
    product_name?: string;
    pos?: string;
    created_at?: string;
    updated_at?: string;
  },
  qty?: number;
  term_description?: string;
  updated_at?: string;
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
export enum PillStateType {
  default = 0,
  reset = 1
}
export interface IContract extends ICoreModel {
  contract_name?: string;
  venue?: any;
  start_date?: any;
  delivery_date?: any;
  details?: string;
  attachments?: any[];
  images?: IProductImage[];
  user?: IUser;
  contract_products?: IProduct[]
  user_client?: IUser[]
}
export interface ICoreModel {
  id?: string;
}
