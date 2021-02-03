import { createAction, props } from '@ngrx/store';

export enum InspectionReportActionTypes {
  inspectionBarReportAction = '[Inspection Report] inspection bar report',
  inspectionBarReportSuccessAction = '[Inspection Report] inspection bar report (success)',
  inspectionProductReportAction = '[Inspection Report] inspection products report',
  inspectionProductReportSuccessAction = '[Inspection Report] inspection products report (success)',
  getInspectorReportAction = '[Inspection Report] get inspector report',
  getInspectorReportSuccessAction = '[Inspection Report] get inspector report (success)',
}
export const getInspectorReportAction = createAction(
  InspectionReportActionTypes.getInspectorReportAction,
  props<{ id: string }>()
);
export const getInspectorReportSuccessAction = createAction(
  InspectionReportActionTypes.getInspectorReportSuccessAction,
  props<{ response: any }>()
);
export const inspectionProductReportAction = createAction(
  InspectionReportActionTypes.inspectionProductReportAction,
  props<{ id: string }>()
);
export const inspectionProductReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionProductReportSuccessAction,
  props<{ response: any }>()
);
export const inspectionBarReportAction = createAction(
  InspectionReportActionTypes.inspectionBarReportAction,
  props<{ id: string }>()
);
export const inspectionBarReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionBarReportSuccessAction,
  props<{ response: any }>()
);