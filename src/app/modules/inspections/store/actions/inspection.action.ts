import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspectionChecklist, IInspectionRun, IInspectionRunPayload } from '../../inspections.models';

export enum InspectionActionTypes {
  loadActiveInspectionAction = '[Inspection Checklist] load active inspection',
  loadActiveInspectionSuccessAction = '[Inspection Checklist] load active inspection (success)',
  runInspectionAction = '[Inspection Run] run inspection',
  runInspectionSuccessAction = '[Inspection Run] run inspection (success)',
  createInspectionChecklistAction = '[Inspection Run] create inspection checklist',
  createInspectionChecklistSuccessAction = '[Inspection Run] create inspection checklist (success)',
  loadInspectionRunAction = '[Inspection Run] load inspection run',
  loadInspectionRunSuccessAction = '[Inspection Run] load inspection run (success)',
  clearLoadAction = '[Inspection Run] clear load',
  updateSourceTermAction = '[Inspection Run] update source term',
  runNextInspectionAction = '[Inspection Run] run next inspection',
  runNextInspectionSuccessAction = '[Inspection Run] run next inspection (success)',
  runPrevInspectionAction = '[Inspection Run] run prev inspection',
  runPrevInspectionSuccessAction = '[Inspection Run] run prev inspection (success)',
  changeInspectionStatusAction = '[Inspection Run] change inspection status',
  changeInspectionStatusSuccessAction = '[Inspection Run] change inspection status (success)',
  deleteAndNavigateToAction = '[Inspection Checklist] remove and navigate to',
  deleteAndNavigateToSuccessAction = '[Inspection Checklist] remove and navigate to (success)',
  copyInspectionAction = '[Inspection Checklist] copy inspection',
  copyInspectionSuccessAction = '[Inspection Checklist] copy inspection (success)',
  navigateToInspectionAction = '[Inspection Checklist] navigate to inspection',
  navigateToInspectionSuccessAction = '[Inspection Checklist] navigate to inspection (success)',
  navigateToFailed = '[Inspection Checklist] navigate to (failed)',
  deleteInspectionAction = '[Inspection Checklist] delete inspection',
  deleteInspectionSuccessAction = '[Inspection Checklist] delete inspection (success)',
  setPauseInspectionStatusAction = '[Inspection Checklist] set pause status inspection',
}
export const setPauseInspectionStatusAction = createAction(
  InspectionActionTypes.setPauseInspectionStatusAction,
  props<{ status: boolean }>()
);
export const deleteInspectionAction = createAction(
  InspectionActionTypes.deleteInspectionAction,
  props<{ id: string }>()
);
export const deleteInspectionSuccessAction = createAction(
  InspectionActionTypes.deleteInspectionSuccessAction,
  props<{ response: any }>()
);
export const navigateToFailed = createAction(
  InspectionActionTypes.navigateToFailed,
  props<{ error: string }>()
);
export const navigateToInspectionAction = createAction(
  InspectionActionTypes.navigateToInspectionAction,
  props<{ saved_checklist_id: string, position: number }>()
);
export const navigateToInspectionSuccessAction = createAction(
  InspectionActionTypes.navigateToInspectionSuccessAction,
  props<{ response: IInspectionRun }>()
);
export const copyInspectionAction = createAction(
  InspectionActionTypes.copyInspectionAction,
  props<{ id: string, copyCount: number, contractProductId?: string }>()
);
export const copyInspectionSuccessAction = createAction(
  InspectionActionTypes.copyInspectionSuccessAction,
  props<{ response: IInspectionRun }>()
);
export const deleteAndNavigateToAction = createAction(
  InspectionActionTypes.deleteAndNavigateToAction,
  props<{ id: string }>()
);
export const deleteAndNavigateToSuccessAction = createAction(
  InspectionActionTypes.deleteAndNavigateToSuccessAction,
  props<{ response: IInspectionRun }>()
);
export const changeInspectionStatusAction = createAction(
  InspectionActionTypes.changeInspectionStatusAction,
  props<{ payload: IInspectionRunPayload }>()
);
export const changeInspectionStatusSuccessAction = createAction(
  InspectionActionTypes.changeInspectionStatusSuccessAction,
  props<{ response: IInspectionRunPayload }>()
);
export const runPrevInspectionAction = createAction(
  InspectionActionTypes.runPrevInspectionAction,
  props<{ payload: { id: string, saved_checklist_id: string } }>()
);
export const runPrevInspectionSuccessAction = createAction(
  InspectionActionTypes.runPrevInspectionSuccessAction,
  props<{ response: any }>()
);
export const runNextInspectionAction = createAction(
  InspectionActionTypes.runNextInspectionAction,
  props<{ payload: { id: string, saved_checklist_id: string } }>()
);
export const runNextInspectionSuccessAction = createAction(
  InspectionActionTypes.runNextInspectionSuccessAction,
  props<{ response: any }>()
);
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
  props<{ payload: IInspectionRunPayload }>()
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
