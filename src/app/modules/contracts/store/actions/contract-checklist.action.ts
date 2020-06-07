import { ICategory, IContractChecklist } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addToChecklist = '[Contract Checklist] Add',
  addToChecklistSuccess = '[Contract Checklist] Add (success)',
}

export const addToChecklist = createAction(
  CategoryActionTypes.addToChecklist,
  props<{ payload: IContractChecklist }>()
);
