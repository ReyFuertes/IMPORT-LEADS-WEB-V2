import { IInspectionChecklist } from './../inspections.models';
import { loadInspectionChecklistSuccessAction } from './inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface InspectionState extends EntityState<any> {
  inspectionChecklist?: IInspectionChecklist[]
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({});
export const initialState: InspectionState = adapter.getInitialState({
  inspectionChecklist: null
});
const inspectionReducer = createReducer(
  initialState,
  on(loadInspectionChecklistSuccessAction, (state, action) => {
    return Object.assign({}, state, { inspectionChecklist: action.items });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return inspectionReducer(state, action);
}
