import { IActiveInspection, IFinishedInspection, IInspectionRun, RunStatusType } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, loadInspectionRunSuccessAction, clearLoadAction, updateSourceTermAction, runInspectionSuccessAction, changeInspectionStatusSuccessAction, setPauseInspectionStatusAction } from '../actions/inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
export interface InspectionState {
  loaded?: boolean;
  activeInspection?: IActiveInspection[],
  finishedInspection?: IFinishedInspection[],
  runInspection?: IInspectionRun
  isPaused?: boolean
}
export const initialState: InspectionState = {
  loaded: null,
  activeInspection: null,
  finishedInspection: null,
  runInspection: null,
  isPaused: null
};
const reducer = createReducer(
  initialState,
  on(setPauseInspectionStatusAction, (state, action) => {
    return Object.assign({}, state, { isPaused: action.status });
  }),
  on(changeInspectionStatusSuccessAction, (state, action) => {
    if (action.response.run_status == RunStatusType.pause) {
      return Object.assign({}, state, { isPaused: true });
    } else if (action.response.run_status == RunStatusType.resume) {
      return Object.assign({}, state, { isPaused: null });
    } else {
      return Object.assign({}, state, { isPaused: null });
    }
  }),
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
