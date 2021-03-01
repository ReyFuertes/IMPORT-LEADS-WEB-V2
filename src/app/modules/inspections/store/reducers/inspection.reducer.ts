import { IActiveInspection, IFinishedInspection, IInspectionRun, RunStatusType } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, loadInspectionRunSuccessAction, changeInspectionRuntimeStatusSuccessAction, setPauseInspectionStatusAction, loadInspectionDetailSuccessAction, loadFinishInspectionSuccessAction, inspectChecklistRunProductSuccessAction, getInspectionWithLastRunProductSuccessAction, runNextInspectionSuccessAction, copyInspectionSuccessAction, clearRunInspectionAction, runPrevInspectionSuccessAction, runNextInspectionAction, clearExistErrorAction } from '../actions/inspection.action';
import { createReducer, on, Action } from "@ngrx/store";
import { saveInsChecklistCommentSuccessAction, updateInsChecklistCommentSuccessAction } from '../actions/inspection-checklist.action';
export interface InspectionState {
  activeInspection?: IActiveInspection[],
  finishedInspections?: IFinishedInspection[],
  runInspection?: IInspectionRun,
  updatedRunInspection?: IInspectionRun
  isPaused?: boolean,
  detail?: IActiveInspection;
  prevExistError: boolean
}
export const initialState: InspectionState = {
  activeInspection: null,
  finishedInspections: null,
  runInspection: null,
  updatedRunInspection: null,
  isPaused: null,
  detail: null,
  prevExistError: null
};
const reducer = createReducer(
  initialState,
  on(clearExistErrorAction, (state) => {
    return Object.assign({}, state, { prevExistError: null });
  }),
  on(runPrevInspectionSuccessAction, (state, action) => {
    if(action?.response?.id) {
      const newState = Object.assign({}, state, {
        runInspection: action.response
      });
      return Object.assign({}, newState);
    }
    return Object.assign({}, state, { prevExistError: true });
  }),
  on(clearRunInspectionAction, (state) => {
    return Object.assign({}, state, { runInspection: null });
  }),
  on(copyInspectionSuccessAction, (state, action) => {
    const newState = Object.assign({}, state, {
      runInspection: action.response
    });
    return Object.assign({}, newState);
  }),
  on(runNextInspectionSuccessAction, (state, action) => {
    const newState = Object.assign({}, state, {
      runInspection: action.response
    });
    return Object.assign({}, newState);
  }),
  on(saveInsChecklistCommentSuccessAction, (state, action) => {
    const newState = Object.assign({}, state, {
      runInspection: action.response
    });
    return Object.assign({}, newState);
  }),
  on(updateInsChecklistCommentSuccessAction, (state, action) => {
    const newState = Object.assign({}, state, {
      runInspection: action.response
    });
    return Object.assign({}, newState);
  }),
  on(getInspectionWithLastRunProductSuccessAction, (state, action) => {
    return Object.assign({}, state, { runInspection: action.response });
  }),
  on(inspectChecklistRunProductSuccessAction, (state, action) => {
    const newState = Object.assign({}, state, {
      runInspection: action.response
    });
    return Object.assign({}, newState);
  }),
  on(loadInspectionDetailSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action?.response[0] });
  }),
  on(setPauseInspectionStatusAction, (state, action) => {
    return Object.assign({}, state, { isPaused: action.status });
  }),
  on(changeInspectionRuntimeStatusSuccessAction, (state, action) => {
    if (action?.response?.run_status == RunStatusType.pause) {
      return Object.assign({}, state, { isPaused: true });
    } else if (action?.response?.run_status == RunStatusType.resume) {
      return Object.assign({}, state, { isPaused: null });
    } else {
      return Object.assign({}, state, { isPaused: null });
    }
  }),
  on(loadFinishInspectionSuccessAction, (state, action) => {
    return Object.assign({}, state, { finishedInspections: action.response });
  }),
  on(loadActiveInspectionSuccessAction, (state, action) => {
    return Object.assign({}, state, { activeInspection: action.response });
  }),
  on(loadInspectionRunSuccessAction, (state, action) => {
    return Object.assign({}, state, { runInspection: action.response });
  })
);
export function InspectionReducer(state: InspectionState, action: Action) {
  return reducer(state, action);
}
