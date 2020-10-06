import { ISimpleItem } from './../../shared/generics/generic.model';
import { IUser } from '../user-management/user-mgmt.model';
import { IContractProduct, IContractTerm, IContractCategory, ISavedChecklist } from '../contracts/contract.model';
import { IVenue } from '../venues/venues.models';
import { IProduct } from '../products/products.model';

export interface IInspectionChecklistImage {
  id?: string;
  image?: any;
  filename?: string;
  file?: File;
  size?: any;
  mimetype?: string;
  inspection_checklist_run?: { id: string };
}
export interface IInsChecklistTerm {
  id?: string;
  checklist_item: {
    id?: string;
    verification?: string;
    comment?: string;
    created_at?: string;
    updated_at?: string;
  }
  term_description?: string;
  term_name?: string;
}
export enum InspectionVeriType {
  ok = 'ok',
  failed = 'failed',
  comment = 'comment'
}
export interface IInspectionChecklist {
  id?: string;
  verification?: string;
  comment?: string;
  inspection_checklist_run?: IInspectionRun;
  contract_term?: IContractTerm;
  contract_category?: IContractCategory,
  saved_checklist?: ISavedChecklist,
  contract_product?: IContractProduct
}
export interface IInsCheckItem {
  id?: string;
  verification?: string;
  comment?: string;
  created_at?: string;
  updated_at?: string;
}
export interface IInspectionRun {
  id?: string;
  checklist?: IInsChecklist;
  count?: number;
  run_status?: string;
}
export enum RunStatusType {
  stop = '0',
  pause = '1',
  resume = '2'
}
export interface IInspectionRuntime {
  id?: string;
  saved_checklist?: IInsChecklist;
  run_status?: RunStatusType
}
export interface IInsChecklist {
  id?: string;
  checklist_name?: string;
  desired_run_date?: string;
  created_at?: string;
  updated_at?: string;
  items?: IInspectionRunItem[]
}
export interface IInspectionRunItem {
  id?: string;
  contract_product?: IContractProduct,
  contract_term?: IContractTerm,
  contract_category?: IContractCategory,
  checklist_item?: IInsCheckItem,
  saved_checklist?: ISavedChecklist
}
export class IFinishedInspection { }
export class IActiveInspection {
  id?: string;
  checklist_contract?: {
    id?: string;
    contract_name?: string;
  };
  user?: IUser;
  desired_run_date?: string;
  run_count?: string;
  checklist_items?: any[];
  venue?: IVenue;
  products?: IProduct[];
  inspectionCount?: number;
}
export interface InspectionPanelModel {
  id: string;
  title: string;
  assignedTo?: string;
  dateRun?: string;
  startDate?: string;
  endDate?: string;
  totalAmount?: number;
  products?: ISimpleItem[];
}
