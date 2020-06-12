import { ContractModuleState } from './index';
import { saveToChecklist, addToChecklist, clearChecklist } from './../actions/contract-checklist.action';
import { IContractChecklist } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractChecklistState extends EntityState<IContractChecklist> {
  checklist?: IContractChecklist[]
}
export const adapter: EntityAdapter<IContractChecklist> = createEntityAdapter<IContractChecklist>({});
export const initialState: ContractChecklistState = adapter.getInitialState({
  checklist: null
});
const reducer = createReducer(
  initialState,
  on(clearChecklist, (state) => {
    return Object.assign({}, state, { checklist: null });
  }),
  on(addToChecklist, (state, action) => {
    return Object.assign({}, state, { checklist: action.payload });
  })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}
export const getChecklists = (state: ContractModuleState) => state.checkList.checklist;
