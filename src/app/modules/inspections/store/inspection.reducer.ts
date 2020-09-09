import { IActiveInspection, IFinishedInspection, IInspectionRun } from './../inspections.models';
import { loadActiveInspectionSuccessAction, loadInspectionRunSuccessAction } from './inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface InspectionState {
  loaded?: boolean;
  activeInspection?: IActiveInspection[],
  finishedInspection?: IFinishedInspection[],
  runInspection?: IInspectionRun[]
}
export const initialState: InspectionState = {
  loaded: null,
  activeInspection: null,
  finishedInspection: null,
  runInspection: null
};
const inspectionReducer = createReducer(
  initialState,
  on(loadActiveInspectionSuccessAction, (state, action) => {
    return Object.assign({}, state, { activeInspection: action.response });
  }),
  on(loadInspectionRunSuccessAction, (state, action) => {
    return Object.assign({}, state, { runInspection: action.response, loaded: true });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return inspectionReducer(state, action);
}
