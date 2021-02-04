import { createAction, props } from '@ngrx/store';

export enum InspectionReportActionTypes {
  inspectionBarChartReportAction = '[Inspection Report] inspection bar report',
  inspectionBarChartReportSuccessAction = '[Inspection Report] inspection bar report (success)',
  inspectionProductsReportAction = '[Inspection Report] inspection products report',
  inspectionProductsReportSuccessAction = '[Inspection Report] inspection products report (success)',
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
export const inspectionProductsReportAction = createAction(
  InspectionReportActionTypes.inspectionProductsReportAction,
  props<{ id: string }>()
);
export const inspectionProductsReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionProductsReportSuccessAction,
  props<{ response: any }>()
);
export const inspectionBarChartReportAction = createAction(
  InspectionReportActionTypes.inspectionBarChartReportAction,
  props<{ id: string }>()
);
export const inspectionBarChartReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionBarChartReportSuccessAction,
  props<{ response: any }>()
);