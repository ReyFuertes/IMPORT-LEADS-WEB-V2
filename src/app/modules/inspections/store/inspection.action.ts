import { IActiveInspection, IInspectionRun, IInspectionChecklist } from './../inspections.models';
import { IContractChecklist, IContractTerm } from './../../contracts/contract.model';
import { createAction, props } from '@ngrx/store';

export enum InspectionActionTypes {
  loadActiveInspectionAction = '[Inspection Checklist] load active inspection',
  loadActiveInspectionSuccessAction = '[Inspection Checklist] load active inspection (success)',
  runInspectionAction = '[Inspection Run] run inspection',
  runInspectionSuccessAction = '[Inspection Run] run inspection (success)',
  createInspectionChecklistAction = '[Inspection Run] create inspection checklist',
  createInspectionChecklistSuccessAction = '[Inspection Run] create inspection checklist (success)',
  loadInspectionRunAction = '[Inspection Checklist] load inspection run',
  loadInspectionRunSuccessAction = '[Inspection Checklist] load inspection run (success)',
  clearLoadAction = '[Inspection Run] clear load',
  updateSourceTermAction = '[Inspection Run] update source term',
}
export const updateSourceTermAction = createAction(
  InspectionActionTypes.updateSourceTermAction,
  props<{ term: IContractTerm }>()
);
export const clearLoadAction = createAction(
  InspectionActionTypes.clearLoadAction
);
export const loadInspectionRunAction = createAction(
  InspectionActionTypes.loadInspectionRunAction,
  props<{ id: string }>()
);
export const loadInspectionRunSuccessAction = createAction(
  InspectionActionTypes.loadInspectionRunSuccessAction,
  props<{ response: IInspectionRun }>()
);
export const createInspectionChecklistAction = createAction(
  InspectionActionTypes.createInspectionChecklistAction,
  props<{ payload: IInspectionChecklist }>()
);
export const createInspectionChecklistSuccessAction = createAction(
  InspectionActionTypes.createInspectionChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);
export const runInspectionAction = createAction(
  InspectionActionTypes.runInspectionAction,
  props<{ run: IInspectionRun }>()
);
export const runInspectionSuccessAction = createAction(
  InspectionActionTypes.runInspectionSuccessAction,
  props<{ response: any }>()
);
export const loadActiveInspectionAction = createAction(
  InspectionActionTypes.loadActiveInspectionAction,
);
export const loadActiveInspectionSuccessAction = createAction(
  InspectionActionTypes.loadActiveInspectionSuccessAction,
  props<{ response: IActiveInspection[] }>()
);
