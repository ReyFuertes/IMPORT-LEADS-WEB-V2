import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionBarReport, IInspectionProductReport } from '../../inspections.models';
import { inspectionBarReportSuccessAction, inspectionProductReportSuccessAction } from '../actions/inspection-report.action';

export interface InspectionReportState {
  bar: IInspectionBarReport,
  products: IInspectionProductReport
}
export const initialState: InspectionReportState = {
  bar: null,
  products: null
};
const reducer = createReducer(
  initialState,
  on(inspectionProductReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { products: action.response });
  }),
  on(inspectionBarReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { bar: action.response });
  }),
);
export function InspectionReportReducer(state: InspectionReportState, action: Action) {
  return reducer(state, action);
}
