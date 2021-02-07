import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionBarReport, IInspectionCommentReport, IInspectionProductReport } from '../../inspections.models';
import { getInspectorReportSuccessAction, inspectionBarChartReportSuccessAction, inspectionProductsReportSuccessAction, getInspectionOkCommentReportSuccessAction, getInspectionFailedCommentReportSuccessAction } from '../actions/inspection-report.action';

export interface InspectionReportState {
  inspectionsBarChartReport: IInspectionBarReport,
  productsReport: IInspectionProductReport,
  inspector: any,
  inspectionOkCommentsReport: IInspectionCommentReport[],
  inspectionFailedCommentsReport: IInspectionCommentReport[]
}
export const initialState: InspectionReportState = {
  inspectionsBarChartReport: null,
  productsReport: null,
  inspector: null,
  inspectionOkCommentsReport: null,
  inspectionFailedCommentsReport: null
};
const reducer = createReducer(
  initialState,
  on(getInspectionFailedCommentReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspectionFailedCommentsReport: action?.response });
  }),
  on(getInspectionOkCommentReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspectionOkCommentsReport: action?.response });
  }),
  on(getInspectorReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspector: action?.response });
  }),
  on(inspectionProductsReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { productsReport: action?.response });
  }),
  on(inspectionBarChartReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspectionsBarChartReport: action?.response });
  }),
);
export function InspectionReportReducer(state: InspectionReportState, action: Action) {
  return reducer(state, action);
}
