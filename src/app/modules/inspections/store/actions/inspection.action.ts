import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspection, IInspectionRun, IInspectionRuntime } from '../../inspections.models';

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
  changeInspectionRuntimeStatusAction = '[Inspection Run] change inspection status',
  changeInspectionRuntimeStatusSuccessAction = '[Inspection Run] change inspection status (success)',
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
  loadInspectionDetailAction = '[Inspection Checklist] load inspection detail',
  loadInspectionDetailSuccessAction = '[Inspection Checklist] load inspection detail (success)',
  finishInspectionAction = '[Inspection] finish inspection',
  finishInspectionSuccessAction = '[Inspection] finish inspection (success)',
  loadFinishInspectionAction = '[Inspection] load finish inspections',
  loadFinishInspectionSuccessAction = '[Inspection] load finish inspections (success)',
  inspectChecklistRunProductAction = '[Inspection Run] update first run product',
  inspectChecklistRunProductSuccessAction = '[Inspection Run] update first run product (success)',
}
export const inspectChecklistRunProductAction = createAction(
  InspectionActionTypes.inspectChecklistRunProductAction,
  props<{ payload: any }>()
);
export const inspectChecklistRunProductSuccessAction = createAction(
  InspectionActionTypes.inspectChecklistRunProductSuccessAction,
  props<{ response: any }>()
);
export const loadFinishInspectionAction = createAction(
  InspectionActionTypes.loadFinishInspectionAction
);
export const loadFinishInspectionSuccessAction = createAction(
  InspectionActionTypes.loadFinishInspectionSuccessAction,
  props<{ response: IActiveInspection[] }>()
);
export const finishInspectionAction = createAction(
  InspectionActionTypes.finishInspectionAction,
  props<{ payload: { id: string } }>()
);
export const finishInspectionSuccessAction = createAction(
  InspectionActionTypes.finishInspectionSuccessAction,
  props<{ response: IActiveInspection }>()
);
export const loadInspectionDetailAction = createAction(
  InspectionActionTypes.loadInspectionDetailAction,
  props<{ params: string }>()
);
export const loadInspectionDetailSuccessAction = createAction(
  InspectionActionTypes.loadInspectionDetailSuccessAction,
  props<{ response: IActiveInspection[] }>()
);
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
  props<{ id: string, copyCount: number, contractProductId?: string, inspection: IInspection }>()
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
export const changeInspectionRuntimeStatusAction = createAction(
  InspectionActionTypes.changeInspectionRuntimeStatusAction,
  props<{ payload: IInspectionRuntime }>()
);
export const changeInspectionRuntimeStatusSuccessAction = createAction(
  InspectionActionTypes.changeInspectionRuntimeStatusSuccessAction,
  props<{ response: IInspectionRuntime }>()
);
export const runPrevInspectionAction = createAction(
  InspectionActionTypes.runPrevInspectionAction,
  props<{ payload: { id: string, saved_checklist_id: string, inspection: IInspection } }>()
);
export const runPrevInspectionSuccessAction = createAction(
  InspectionActionTypes.runPrevInspectionSuccessAction,
  props<{ response: any }>()
);
export const runNextInspectionAction = createAction(
  InspectionActionTypes.runNextInspectionAction,
  props<{ payload: { id: string, saved_checklist_id: string, inspection: IInspection, contractProductId: string } }>()
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
  props<{ payload: any }>()
);
export const createInspectionChecklistSuccessAction = createAction(
  InspectionActionTypes.createInspectionChecklistSuccessAction,
  props<{ response: any }>()
);
export const runInspectionAction = createAction(
  InspectionActionTypes.runInspectionAction,
  props<{ payload: IInspectionRuntime }>()
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
