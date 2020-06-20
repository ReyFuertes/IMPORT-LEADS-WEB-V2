import { IInspectionChecklist } from './../inspections.models';
import { IContractChecklist } from './../../contracts/contract.model';
import { loadChecklist, loadChecklistSuccess } from './inspection.action';
import { IInspection } from './../inspections.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface InspectionState extends EntityState<IInspection> {
  inspectionChecklist?: IInspectionChecklist[]
}
export const adapter: EntityAdapter<IInspection> = createEntityAdapter<IInspection>({});
export const initialState: InspectionState = adapter.getInitialState({
  inspectionChecklist: null
});
const inspectionReducer = createReducer(
  initialState,
  on(loadChecklistSuccess, (state, action) => {
    return Object.assign({}, state, { inspectionChecklist: action.items });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return inspectionReducer(state, action);
}
