import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspectionChecklist, IInspectionRun } from '../../inspections.models';

export enum InspectionActionTypes {
  saveInsChecklistAction = '[Inspection Checklist] save checklist',
  saveInsChecklistSuccessAction = '[Inspection Checklist] save checklist (success)',
  getInsChecklistAction = '[Inspection Checklist] get checklist',
  getInsChecklistSuccessAction = '[Inspection Checklist] get checklist (success)',
  deleteInsChecklistAction = '[Inspection Checklist] delete checklist'
}
export const deleteInsChecklistAction = createAction(
  InspectionActionTypes.deleteInsChecklistAction,
  props<{ id: string }>()
);
export const getInsChecklistAction = createAction(
  InspectionActionTypes.getInsChecklistAction,
  props<{ id: string }>()
);
export const getInsChecklistSuccessAction = createAction(
  InspectionActionTypes.getInsChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);
export const saveInsChecklistAction = createAction(
  InspectionActionTypes.saveInsChecklistAction,
  props<{ payload: IInspectionChecklist }>()
);
export const saveInsChecklistSuccessAction = createAction(
  InspectionActionTypes.saveInsChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);