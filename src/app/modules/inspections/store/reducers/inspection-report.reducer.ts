import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionBarReport, IInspectionProductReport } from '../../inspections.models';
import { getInspectorReportSuccessAction, inspectionBarChartReportSuccessAction, inspectionProductsReportSuccessAction } from '../actions/inspection-report.action';

export interface InspectionReportState {
  inspectionsBarChartReport: IInspectionBarReport,
  productsReport: IInspectionProductReport,
  inspector: any
}
export const initialState: InspectionReportState = {
  inspectionsBarChartReport: null,
  productsReport: null,
  inspector: null
};
const reducer = createReducer(
  initialState,
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
