import { ISavedChecklistPayload, ISavedChecklistItem, IContractChecklistItem } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum SavedChecklistActionTypes {
  saveChecklistAction = '[Save Checklist] Save',
  saveChecklistSuccessAction = '[Save Checklist] Save (success)',
  loadSavedChecklistAction = '[Load Checklist] Load saved',
  loadSavedChecklistSuccessAction = '[Load Checklist] Load saved (success)',
  getSavedChecklistByIdAction = '[Contract Checklist] get saved checklist by id',
  getSavedChecklistByIdSuccessAction = '[Contract Checklist] get saved checklist by id (success)',
}
export const getSavedChecklistByIdAction = createAction(
  SavedChecklistActionTypes.getSavedChecklistByIdAction,
  props<{ id: string }>()
);
export const getSavedChecklistByIdSuccessAction = createAction(
  SavedChecklistActionTypes.getSavedChecklistByIdSuccessAction,
  props<{ response: IContractChecklistItem[] }>()
);
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
