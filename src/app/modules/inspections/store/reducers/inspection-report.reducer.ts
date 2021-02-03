import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionBarReport, IInspectionProductReport } from '../../inspections.models';
import { getInspectorReportSuccessAction, inspectionBarReportSuccessAction, inspectionProductReportSuccessAction } from '../actions/inspection-report.action';

export interface InspectionReportState {
  inspectionsLineReport: IInspectionBarReport,
  products: IInspectionProductReport,
  inspector: any
}
export const initialState: InspectionReportState = {
  inspectionsLineReport: null,
  products: null,
  inspector: null
};
const reducer = createReducer(
  initialState,
  on(getInspectorReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspector: action?.response });
  }),
  on(inspectionBarReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { products: action?.response });
  }),
  on(inspectionProductReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspectionsLineReport: action?.response });
  }),
);
export function InspectionReportReducer(state: InspectionReportState, action: Action) {
  return reducer(state, action);
}
