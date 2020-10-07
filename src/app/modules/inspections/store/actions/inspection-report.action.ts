import { createAction, props } from '@ngrx/store';
import { IInspectionBarReport, IInspectionChecklist } from '../../inspections.models';

export enum InspectionReportActionTypes {
  inspectionBarReportAction = '[Inspection Report] inspection bar report',
  inspectionBarReportSuccessAction = '[Inspection Report] inspection bar report (success)',
}
export const inspectionBarReportAction = createAction(
  InspectionReportActionTypes.inspectionBarReportAction,
  props<{ id: string }>()
);
export const inspectionBarReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionBarReportSuccessAction,
  props<{ response: IInspectionBarReport }>()
);