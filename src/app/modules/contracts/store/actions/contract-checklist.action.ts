import { ICategory, IContractChecklist, IContractChecklistItem } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addToChecklist = '[Contract Checklist] Add',
  addToChecklistSuccess = '[Contract Checklist] Add (success)',
  deleteChecklist = '[Contract Checklist] Delete',
  deleteChecklistSuccess = '[Contract Checklist] Delete (success)',
  saveToChecklist = '[Contract Checklist] Save',
  saveToChecklistSuccess = '[Contract Checklist] Save (success)',
  clearChecklist = '[Contract Checklist] Clear',
  highlightChecklist = '[Contract Checklist] Highlight',
  loadChecklist = '[Inspection Checklist] load',
  loadChecklistSuccess = '[Inspection Checklist] load (success)',
}
export const loadChecklist = createAction(
  CategoryActionTypes.loadChecklist,
);
export const loadChecklistSuccess = createAction(
  CategoryActionTypes.loadChecklistSuccess,
  props<{ items: IContractChecklistItem[] }>()
);
export const deleteChecklist = createAction(
  CategoryActionTypes.deleteChecklist,
  props<{ payload: IContractChecklistItem }>()
);
export const deleteChecklistSuccess = createAction(
  CategoryActionTypes.deleteChecklistSuccess,
  props<{ payload: IContractChecklistItem }>()
);
export const highlightChecklist = createAction(
  CategoryActionTypes.highlightChecklist,
  props<{ highlight: boolean }>()
);
export const clearChecklist = createAction(
  CategoryActionTypes.clearChecklist
);
export const addToChecklist = createAction(
  CategoryActionTypes.addToChecklist,
  props<{ payload: IContractChecklist }>()
);
export const addToChecklistSuccess = createAction(
  CategoryActionTypes.addToChecklistSuccess,
  props<{ item: IContractChecklistItem }>()
);
export const saveToChecklist = createAction(
  CategoryActionTypes.saveToChecklist,
  props<{ payload: IContractChecklist[] }>()
);
export const saveToChecklistSuccess = createAction(
  CategoryActionTypes.saveToChecklistSuccess,
  props<{ payload: IContractChecklist[] }>()
);
