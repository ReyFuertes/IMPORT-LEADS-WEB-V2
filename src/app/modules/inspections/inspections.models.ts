import { ISimpleItem } from './../../shared/generics/generic.model';
import { IUser } from '../user-management/user-mgmt.model';
import { ISavedChecklistItem } from '../contracts/contract.model';
import { IVenue } from '../venues/venues.models';
import { IProduct } from '../products/products.model';

export enum InspectionVerification {
  ok = 1,
  failed = 2,
  comment = 3
}
export interface IInspectionChecklist {
  id?: string;
  verification?: InspectionVerification;
  remarks?: string;
  inspection_run?: IInspectionRun;
}
export interface IInspectionRun {
  id?: string;
  saved_checklist?: { id: string };
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
  venue: IVenue;
  products: IProduct[]
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
