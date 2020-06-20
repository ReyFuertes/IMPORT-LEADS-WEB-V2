import { loadChecklistSuccess } from './../../../inspections/store/inspection.action';
import { ContractModuleState } from './index';
import { saveToChecklist, deleteChecklistSuccess, clearChecklist, highlightChecklist, addToChecklistSuccess, saveToChecklistSuccess } from './../actions/contract-checklist.action';
import { IContractChecklist, IContractChecklistItem } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

export interface ContractChecklistState extends EntityState<IContractChecklist> {
  checklist?: IContractChecklistItem[],
  isHighlighting?: boolean
}
export const adapter: EntityAdapter<IContractChecklist> = createEntityAdapter<IContractChecklist>({});
export const initialState: ContractChecklistState = adapter.getInitialState({
  checklist: null,
  isHighlighting: null
});
const reducer = createReducer(
  initialState,
  on(loadChecklistSuccess, (state, action) => {
    return Object.assign({}, state, { checklist: action.items });
  }),
  on(highlightChecklist, (state, action) => {
    return Object.assign({}, state, { isHighlighting: action.highlight });
  }),
  on(clearChecklist, (state) => {
    return Object.assign({}, state, { checklist: null });
  }),
  on(addToChecklistSuccess, (state, action) => {
    const checklist = Object.assign([], state.checklist);
    const match = checklist.filter(c => c.id === action.item.id).shift();
    if (!match) {
      checklist.push(action.item);
    }

    return Object.assign({}, state, { checklist });
  }),
  on(saveToChecklistSuccess, (state, action) => {
    return Object.assign({}, state, { checklist: action.payload });
  }),
  on(deleteChecklistSuccess, (state, action) => {
    /* remove from preselected products */
    const newCheckList = state.checklist;
    _.remove(newCheckList,
      (p: { id: string, _id: string }) => p.id === action.payload.id);

    return Object.assign({}, state, { checklist: newCheckList });
  })
);
export function ContractChecklistReducer(state: ContractChecklistState, action: Action) {
  return reducer(state, action);
}
export const getChecklists = (state: ContractModuleState) => state.checkList.checklist;
