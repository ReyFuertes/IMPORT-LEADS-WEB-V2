import { IActiveInspection, IFinishedInspection, IInspectionRun } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, loadInspectionRunSuccessAction, clearLoadAction, updateSourceTermAction, runInspectionSuccessAction } from '../actions/inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
export interface InspectionState {
  loaded?: boolean;
  activeInspection?: IActiveInspection[],
  finishedInspection?: IFinishedInspection[],
  runInspection?: IInspectionRun
}
export const initialState: InspectionState = {
  loaded: null,
  activeInspection: null,
  finishedInspection: null,
  runInspection: null
};
const reducer = createReducer(
  initialState,
  on(updateSourceTermAction, (state, action) => {
    /* override the term */
    let newState = Object.assign({}, state);
    let checklist_items: any;
    checklist_items = newState?.runInspection?.checklist?.items?.map((item, idx) => {
      if (item.contract_term.id === action.term.id) {
        return Object.assign({}, item, { contract_term: action.term });
      }
      return item;
    });
    return Object.assign({}, state, {
      runInspection: {
        saved_checklist: { checklist_items }
      }
    });
  }),
  on(clearLoadAction, (state) => {
    return Object.assign({}, state, { loaded: null });
  }),
  on(loadActiveInspectionSuccessAction, (state, action) => {
    return Object.assign({}, state, { activeInspection: action.response });
  }),
  on(loadInspectionRunSuccessAction, (state, action) => {
    return Object.assign({}, state, { runInspection: action.response, loaded: true });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return reducer(state, action);
}
