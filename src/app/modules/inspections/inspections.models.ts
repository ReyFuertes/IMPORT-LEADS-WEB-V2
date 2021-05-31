import { ISimpleItem } from './../../shared/generics/generic.model';
import { IUser } from '../user-management/user-mgmt.model';
import { IContractProduct, IContractTerm, IContractCategory, ISavedChecklist } from '../contracts/contract.model';
import { IVenue } from '../venues/venues.models';
import { IProduct } from '../products/products.model';

export interface IInspectionCommentReport {
  comment?: string;
  contract_product?: any;
  contract_term?: any;
  created_at?: string;
  id?: string;
  image?: any;
  saved_checklist?: any;
  verification: InspectionVerificationType
}
export interface IInspectionProductReport {
  totalFailedTermsCount?: number;
  totalPassedTermsCount?: number;
  totalItems?: number,
  products: Array<{
    contract_product: {
      id?: string,
      saved_checklist: {
        id?: string,
      }
    },
    product: {
      id?: string,
      product_name?: string,
    },
    failedTermsCount?: number
    passedTermsCount?: number
  }>
}
export interface IInspectionReportItem {
  id?: string;
  itemCount?: number,
  runTime?: { hours: number, minutes: number, seconds: number, time: string }
  totalRuntime?: string;
  inspector?: { id: string, username: string; }
  runEnd?: string;
  runStart?: string;
}
export interface IInspectionBarReport {
  bar_data: Array<{ count: number, date: string, inspection_checklist_run_count?: number }>,
  end_date?: string;
  start_date?: string;
  total_checked?: number;
  inspection_time?: any;
  average_duration_per_item?: any
}
export interface IInspectionChecklistImage {
  id?: string;
  image?: any;
  filename?: string;
  file?: File;
  size?: any;
  mimetype?: string;
  inspection_checklist_run?: { id: string };
}
export class InsChecklistTerm {
  id?: string;
  term_description?: string;
  term_name?: string;
  comment?: IInspectionChecklistComment;
}
export enum InspectionVerificationType {
  ok = 'ok',
  failed = 'failed',
  comment = 'comment'
}
export interface IInspectionChecklistComment {
  id?: string;
  verification?: string;
  comment?: string;
  inspection_checklist_run?: IInspectionRun;
  contract_term?: IContractTerm;
  contract_category?: IContractCategory,
  saved_checklist?: ISavedChecklist,
  contract_product?: IContractProduct
}
export interface IInspectionRun {
  id?: string;
  saved_checklist?: ISavedChecklist;
  count?: number;
  run_status?: string;
  inspection?: IInspection;
  contract_products?: any;
  saved_checklist_items?: any;
  terms?: any[];
  checklist_product?: { id: string }
}
export interface IInspection {
  id?: string;
  created_at?: string;
  is_finished?: boolean
}
export enum RunStatusType {
  running = '0',
  pause = '1',
  resume = '2',
  stop = '3',
}
export interface IInspectionRuntime {
  id?: string;
  saved_checklist?: IInsChecklist;
  user?: any;
  run_status?: RunStatusType;
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
  checklist_item?: any,
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
