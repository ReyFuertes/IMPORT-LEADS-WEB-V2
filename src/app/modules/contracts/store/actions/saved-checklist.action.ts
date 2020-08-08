import { ISavedChecklistPayload, ISavedChecklist } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum SavedChecklistActionTypes {
  saveChecklistAction = '[Save Checklist] Save',
  saveChecklistSuccessAction = '[Save Checklist] Save (success)',
  loadChecklistAction = '[Load Checklist] Load',
  loadChecklistSuccessAction = '[Load Checklist] Load (success)'
}
export const loadChecklistAction = createAction(
  SavedChecklistActionTypes.loadChecklistAction
);
export const loadChecklistSuccessAction = createAction(
  SavedChecklistActionTypes.loadChecklistSuccessAction,
  props<{ items: ISavedChecklist[] }>()
);

export const saveChecklistAction = createAction(
  SavedChecklistActionTypes.saveChecklistAction,
  props<{ payload: ISavedChecklistPayload }>()
);
export const saveChecklistSuccessAction = createAction(
  SavedChecklistActionTypes.saveChecklistSuccessAction,
  props<{ created: ISavedChecklist }>()
);
