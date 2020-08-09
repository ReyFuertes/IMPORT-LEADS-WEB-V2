import { IInspectionChecklist } from './../inspections.models';
import { IContractChecklist } from './../../contracts/contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  loadInspectionChecklistAction = '[Inspection Checklist] load',
  loadInspectionChecklistSuccessAction = '[Inspection Checklist] load (success)',
}
export const loadInspectionChecklistAction = createAction(
  CategoryActionTypes.loadInspectionChecklistAction,
);
export const loadInspectionChecklistSuccessAction = createAction(
  CategoryActionTypes.loadInspectionChecklistSuccessAction,
  props<{ items: IInspectionChecklist[] }>()
);
