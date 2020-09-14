import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspectionChecklist, IInspectionRun } from '../../inspections.models';

export enum InspectionActionTypes {
  saveInsChecklistAction = '[Inspection Checklist] save checklist',
  saveInsChecklistSuccessAction = '[Inspection Checklist] save checklist (success)'
}
export const saveInsChecklistAction = createAction(
  InspectionActionTypes.saveInsChecklistAction,
  props<{ payload: IInspectionChecklist }>()
);
export const saveInsChecklistSuccessAction = createAction(
  InspectionActionTypes.saveInsChecklistSuccessAction,
  props<{ response: IInspectionChecklist }>()
);