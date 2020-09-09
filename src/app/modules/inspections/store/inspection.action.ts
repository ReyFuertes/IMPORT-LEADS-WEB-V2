import { IActiveInspection, IInspectionRun, IInspectionChecklist } from './../inspections.models';
import { IContractChecklist } from './../../contracts/contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  loadInspectionChecklistAction = '[Inspection Checklist] load',
  loadInspectionChecklistSuccessAction = '[Inspection Checklist] load (success)',
  runInspectionAction = '[Inspection Run] run inspection',
  runInspectionSuccessAction = '[Inspection Run] run inspection (success)',
  createInspectionChecklistAction = '[Inspection Run] create inspection checklist',
  createInspectionChecklistSuccessAction = '[Inspection Run] create inspection checklist (success)',
}
export const createInspectionChecklistAction = createAction(
  CategoryActionTypes.createInspectionChecklistAction,
  props<{ payload: IInspectionChecklist }>()
);
export const createInspectionChecklistSuccessAction = createAction(
  CategoryActionTypes.createInspectionChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);
export const runInspectionAction = createAction(
  CategoryActionTypes.runInspectionAction,
  props<{ run: IInspectionRun }>()
);
export const runInspectionSuccessAction = createAction(
  CategoryActionTypes.runInspectionSuccessAction,
  props<{ response: any }>()
);
export const loadInspectionChecklistAction = createAction(
  CategoryActionTypes.loadInspectionChecklistAction,
);
export const loadInspectionChecklistSuccessAction = createAction(
  CategoryActionTypes.loadInspectionChecklistSuccessAction,
  props<{ response: IActiveInspection[] }>()
);
