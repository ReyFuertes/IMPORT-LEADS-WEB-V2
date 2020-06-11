import { ICategory, IContractChecklist } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addToChecklist = '[Contract Checklist] Add',
  saveToChecklist = '[Contract Checklist] Save',
  saveToChecklistSuccess = '[Contract Checklist] Save (success)',
}
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
