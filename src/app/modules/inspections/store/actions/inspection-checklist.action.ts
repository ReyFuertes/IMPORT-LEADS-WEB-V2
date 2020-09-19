import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspectionChecklist, IInspectionChecklistImage, IInspectionRun } from '../../inspections.models';

export enum InspectionActionTypes {
  saveInsChecklistAction = '[Inspection Checklist] save checklist',
  saveInsChecklistSuccessAction = '[Inspection Checklist] save checklist (success)',
  getInsChecklistAction = '[Inspection Checklist] get checklist',
  getInsChecklistSuccessAction = '[Inspection Checklist] get checklist (success)',
  deleteInsChecklistAction = '[Inspection Checklist] delete checklist',
  addInsChecklistImageAction = '[Inspection Checklist] add checklist image',
  removeInsChecklistImageAction = '[Inspection Checklist] remove checklist image',
  updateInsChecklistAction = '[Inspection Checklist] update checklist',
  updateInsChecklistSuccessAction = '[Inspection Checklist] update checklist (success)',
}
export const updateInsChecklistAction = createAction(
  InspectionActionTypes.updateInsChecklistAction,
  props<{ payload: IInspectionChecklist }>()
);
export const updateInsChecklistSuccessAction = createAction(
  InspectionActionTypes.updateInsChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);
export const removeInsChecklistImageAction = createAction(
  InspectionActionTypes.removeInsChecklistImageAction,
  props<{ image: IInspectionChecklistImage }>()
);
export const addInsChecklistImageAction = createAction(
  InspectionActionTypes.addInsChecklistImageAction,
  props<{ image: IInspectionChecklistImage }>()
);
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