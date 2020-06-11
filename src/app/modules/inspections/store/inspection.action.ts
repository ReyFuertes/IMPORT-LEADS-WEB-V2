import { IInspectionChecklist } from './../inspections.models';
import { IContractChecklist } from './../../contracts/contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  loadChecklist = '[Inspection Checklist] load',
  loadChecklistSuccess = '[Inspection Checklist] load (success)',
}
export const loadChecklist = createAction(
  CategoryActionTypes.loadChecklist,
);
export const loadChecklistSuccess = createAction(
  CategoryActionTypes.loadChecklistSuccess,
  props<{ items: IInspectionChecklist[] }>()
);
