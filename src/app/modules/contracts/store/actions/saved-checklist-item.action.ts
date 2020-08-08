import { ISavedChecklistItem } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum SavedChecklistItemActionTypes {
  saveChecklistItemAction = '[Save Checklist Item] Save',
  saveChecklistItemSuccessAction = '[Save Checklist Item] Save (success)'
}
export const saveChecklistItemAction = createAction(
  SavedChecklistItemActionTypes.saveChecklistItemAction,
  props<{ payload: ISavedChecklistItem }>()
);
export const saveChecklistItemSuccessAction = createAction(
  SavedChecklistItemActionTypes.saveChecklistItemSuccessAction,
  props<{ created: ISavedChecklistItem }>()
);
