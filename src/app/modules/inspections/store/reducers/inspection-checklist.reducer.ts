import { createReducer, on, Action } from "@ngrx/store";
export interface InspectionChecklistState {
}
export const initialState: InspectionChecklistState = {

};
const reducer = createReducer(
  initialState
);
export function InspectionChecklistReducer(state: InspectionChecklistState, action: Action) {
  return reducer(state, action);
}
