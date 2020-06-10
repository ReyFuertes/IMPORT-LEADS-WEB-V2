import { ICategory, IContractChecklist } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  saveToChecklist = '[Contract Checklist] Add',
  saveToChecklistSuccess = '[Contract Checklist] Add (success)',
}

export const saveToChecklist = createAction(
  CategoryActionTypes.saveToChecklist,
  props<{ payload: IContractChecklist }>()
);
