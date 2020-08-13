import { ISavedChecklistPayload, ISavedChecklistItem } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum SavedChecklistActionTypes {
  saveChecklistAction = '[Save Checklist] Save',
  saveChecklistSuccessAction = '[Save Checklist] Save (success)',
  loadSavedChecklistAction = '[Load Checklist] Load saved',
  loadSavedChecklistSuccessAction = '[Load Checklist] Load saved (success)'
}
export const loadSavedChecklistAction = createAction(
  SavedChecklistActionTypes.loadSavedChecklistAction
);
export const loadSavedChecklistSuccessAction = createAction(
  SavedChecklistActionTypes.loadSavedChecklistSuccessAction,
  props<{ items: ISavedChecklistItem[] }>()
);

export const saveChecklistAction = createAction(
  SavedChecklistActionTypes.saveChecklistAction,
  props<{ payload: ISavedChecklistPayload }>()
);
export const saveChecklistSuccessAction = createAction(
  SavedChecklistActionTypes.saveChecklistSuccessAction,
  props<{ created: ISavedChecklistItem }>()
);
