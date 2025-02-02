import { createAction, props } from '@ngrx/store';

export enum InspectionReportActionTypes {
  inspectionBarChartReportAction = '[Inspection Report] inspection bar report',
  inspectionBarChartReportSuccessAction = '[Inspection Report] inspection bar report (success)',
  inspectionProductsReportAction = '[Inspection Report] inspection products report',
  inspectionProductsReportSuccessAction = '[Inspection Report] inspection products report (success)',
  getInspectorReportAction = '[Inspection Report] get inspector report',
  getInspectorReportSuccessAction = '[Inspection Report] get inspector report (success)',
  inspectionOkCommentsReport = '[Inspection Report] get comment report',
  getInspectionOkCommentReportSuccessAction = '[Inspection Report] get comment report (success)',
  getInspectionFailedCommentsReportAction = '[Inspection Report] get failed comment report',
  getInspectionFailedCommentReportSuccessAction = '[Inspection Report] get failed comment report (success)',
  getTagsReportAction = '[Inspection Report] get tag report',
  getTagsReportSuccessAction = '[Inspection Report] get tag report (success)',
  downloadProductionImagesAction = '[Inspection Report] download production images',
  downloadProductionImagesSuccessAction = '[Inspection Report] download production images (success)',
  getTagTermsReportAction = '[Inspection Report] get tag terms report',
  getTagTermsReportSuccessAction = '[Inspection Report] get tag terms report (success)',
}
export const getTagTermsReportAction = createAction(
  InspectionReportActionTypes.getTagTermsReportAction,
  props<{ saved_checklist_id: string }>()
);
export const getTagTermsReportSuccessAction = createAction(
  InspectionReportActionTypes.getTagTermsReportSuccessAction,
  props<{ response: any }>()
);
export const downloadProductionImagesAction = createAction(
  InspectionReportActionTypes.downloadProductionImagesAction,
  props<{ saved_checklist_id: string }>()
);
export const downloadProductionImagesSuccessAction = createAction(
  InspectionReportActionTypes.downloadProductionImagesSuccessAction,
  props<{ response: any }>()
);
export const getTagsReportAction = createAction(
  InspectionReportActionTypes.getTagsReportAction,
  props<{ saved_checklist_id: string }>()
);
export const getTagsReportSuccessAction = createAction(
  InspectionReportActionTypes.getTagsReportSuccessAction,
  props<{ response: any }>()
);
export const getInspectionFailedCommentsReportAction = createAction(
  InspectionReportActionTypes.getInspectionFailedCommentsReportAction,
  props<{ saved_checklist_id: string }>()
);
export const getInspectionFailedCommentReportSuccessAction = createAction(
  InspectionReportActionTypes.getInspectionFailedCommentReportSuccessAction,
  props<{ response: any }>()
);
export const inspectionOkCommentsReport = createAction(
  InspectionReportActionTypes.inspectionOkCommentsReport,
  props<{ saved_checklist_id: string }>()
);
export const getInspectionOkCommentReportSuccessAction = createAction(
  InspectionReportActionTypes.getInspectionOkCommentReportSuccessAction,
  props<{ response: any }>()
);
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
  props<{ id: string, date?: any }>()
);
export const inspectionBarChartReportSuccessAction = createAction(
  InspectionReportActionTypes.inspectionBarChartReportSuccessAction,
  props<{ response: any }>()
);