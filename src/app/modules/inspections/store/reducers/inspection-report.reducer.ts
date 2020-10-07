import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionBarReport } from '../../inspections.models';
import { inspectionBarReportSuccessAction } from '../actions/inspection-report.action';

export interface InspectionReportState {
  bar: IInspectionBarReport
}
export const initialState: InspectionReportState = {
  bar: null
};
const reducer = createReducer(
  initialState,
  on(inspectionBarReportSuccessAction, (state, action) => {
    return Object.assign({}, state, { bar: action.response });
  }),
);
export function InspectionReportReducer(state: InspectionReportState, action: Action) {
  return reducer(state, action);
}
