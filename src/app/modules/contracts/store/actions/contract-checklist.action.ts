import { ICategory, IContractChecklist } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addToChecklist = '[Contract Checklist] Add',
  saveToChecklist = '[Contract Checklist] Save',
  saveToChecklistSuccess = '[Contract Checklist] Save (success)',
  clearChecklist = '[Contract Checklist] Clear',
  highlightChecklist = '[Contract Checklist] Highlight'
}
export const highlightChecklist = createAction(
  CategoryActionTypes.highlightChecklist,
  props<{ highlight: boolean }>()
);
export const clearChecklist = createAction(
  CategoryActionTypes.clearChecklist
);
export const addToChecklist = createAction(
  CategoryActionTypes.addToChecklist,
  props<{ payload: IContractChecklist[] }>()
);
export const saveToChecklist = createAction(
  CategoryActionTypes.saveToChecklist,
  props<{ payload: IContractChecklist[] }>()
);
export const saveToChecklistSuccess = createAction(
  CategoryActionTypes.saveToChecklistSuccess,
  props<{ payload: IContractChecklist[] }>()
);
