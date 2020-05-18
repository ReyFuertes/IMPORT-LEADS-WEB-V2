import { ISimpleItem } from './../../shared/generics/generic.model';
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
