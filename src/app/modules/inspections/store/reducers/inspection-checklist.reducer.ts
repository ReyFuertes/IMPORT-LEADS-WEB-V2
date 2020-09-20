import { createReducer, on, Action } from "@ngrx/store";
import { IInspectionChecklistImage } from '../../inspections.models';
import { addInsChecklistImageAction, addInsChecklistImagesAction, removeInsChecklistImageAction, clearInsChecklistImageAction, saveInsChecklisImageSuccessAction } from '../actions/inspection-checklist.action';
import * as _ from 'lodash';

export interface InspectionChecklistState {
  checklistImages: IInspectionChecklistImage[]
}
export const initialState: InspectionChecklistState = {
  checklistImages: null
};
const reducer = createReducer(
  initialState,
  on(clearInsChecklistImageAction, (state) => {
    return Object.assign({}, state, { checklistImages: null });
  }),
  on(saveInsChecklisImageSuccessAction, (state) => {
    debugger
    /* just remove the cached images after saving */
    return Object.assign({}, state, { checklistImages: null });
  }),
  on(removeInsChecklistImageAction, (state, action) => {
    const checklistImages = Object.assign([], state.checklistImages);
    const index: number = checklistImages.indexOf(action.image);
    
    if (index !== -1) {
      checklistImages.splice(index, 1);
    }

    return Object.assign({}, state, { checklistImages });
  }),
  on(addInsChecklistImagesAction, (state, action) => {
    let checklistImages = Object.assign([], state.checklistImages || []);
    checklistImages.push(...action.images);

    return Object.assign({}, state, { checklistImages });
  }),
  on(addInsChecklistImageAction, (state, action) => {
    let checklistImages = Object.assign([], state.checklistImages);
    checklistImages.push(action.image);

    return Object.assign({}, state, { checklistImages });
  }),
);
export function InspectionChecklistReducer(state: InspectionChecklistState, action: Action) {
  return reducer(state, action);
}
