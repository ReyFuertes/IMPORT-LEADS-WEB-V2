import { IActiveInspection, IFinishedInspection } from './../inspections.models';
import { loadInspectionChecklistSuccessAction } from './inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface InspectionState {
  activeInspection?: IActiveInspection[],
  finishedInspection?: IFinishedInspection[]
}
export const initialState: InspectionState = {
  activeInspection: null,
  finishedInspection: null
};
const inspectionReducer = createReducer(
  initialState,
  on(loadInspectionChecklistSuccessAction, (state, action) => {
    return Object.assign({}, state, { activeInspection: action.response });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return inspectionReducer(state, action);
}
