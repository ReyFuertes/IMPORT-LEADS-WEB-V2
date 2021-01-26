import { createAction, props } from '@ngrx/store';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';
import { IActiveInspection, IInspectionChecklistComment, IInspectionChecklistImage, IInspectionRun } from '../../inspections.models';

export enum InspectionActionTypes {
  saveInsChecklistAction = '[Inspection Checklist] save checklist',
  saveInsChecklistSuccessAction = '[Inspection Checklist] save checklist (success)',
  getInsChecklistAction = '[Inspection Checklist] get checklist',
  getInsChecklistSuccessAction = '[Inspection Checklist] get checklist (success)',
  deleteInsChecklistAction = '[Inspection Checklist] delete checklist',
  addInsChecklistImageAction = '[Inspection Checklist] add checklist image',
  addInsChecklistImagesAction = '[Inspection Checklist] add multiple checklist images',
  updateInsChecklistCommentAction = '[Inspection Checklist] update checklist',
  updateInsChecklistCommentSuccessAction = '[Inspection Checklist] update checklist (success)',
  saveInsChecklisImageAction = '[Inspection Checklist] save checklist image',
  saveInsChecklisImageSuccessAction = '[Inspection Checklist] save checklist image (success)',
  saveInsChecklistImageFilesAction = '[Inspection Checklist] upload checklist image',
  updateInsChecklistImageFilesSuccessAction = '[Inspection Checklist] upload checklist image (success)',
  removeInsChecklistImageAction = '[Inspection Checklist] remove checklist image',
  removeInsChecklistImageSuccessAction = '[Inspection Checklist] delete image checklist (success)',
  clearInsChecklistImageAction = '[Inspection Checklist] clear checklist image',
}
export const clearInsChecklistImageAction = createAction(
  InspectionActionTypes.clearInsChecklistImageAction
);
export const removeInsChecklistImageSuccessAction = createAction(
  InspectionActionTypes.removeInsChecklistImageSuccessAction,
  props<{ response: IInspectionChecklistImage }>()
);
export const saveInsChecklistImageFilesAction = createAction(
  InspectionActionTypes.saveInsChecklistImageFilesAction,
  props<{ files: any }>()
);
export const updateInsChecklistImageFilesSuccessAction = createAction(
  InspectionActionTypes.updateInsChecklistImageFilesSuccessAction,
  props<{ response: any }>()
);
export const saveInsChecklisImageAction = createAction(
  InspectionActionTypes.saveInsChecklisImageAction,
  props<{ payload: IInspectionChecklistImage[] }>()
);
export const saveInsChecklisImageSuccessAction = createAction(
  InspectionActionTypes.saveInsChecklisImageSuccessAction,
  props<{ response: IInspectionChecklistImage[] }>()
);
export const updateInsChecklistCommentAction = createAction(
  InspectionActionTypes.updateInsChecklistCommentAction,
  props<{ payload: IInspectionChecklistComment }>()
);
export const updateInsChecklistCommentSuccessAction = createAction(
  InspectionActionTypes.updateInsChecklistCommentSuccessAction,
  props<{ response: IInspectionChecklistComment }>()
);
export const removeInsChecklistImageAction = createAction(
  InspectionActionTypes.removeInsChecklistImageAction,
  props<{ image: IInspectionChecklistImage }>()
);
export const addInsChecklistImageAction = createAction(
  InspectionActionTypes.addInsChecklistImageAction,
  props<{ image: IInspectionChecklistImage }>()
);
export const addInsChecklistImagesAction = createAction(
  InspectionActionTypes.addInsChecklistImagesAction,
  props<{ images: IInspectionChecklistImage[] }>()
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
  props<{ response: IInspectionChecklistComment }>()
);
export const saveInsChecklistAction = createAction(
  InspectionActionTypes.saveInsChecklistAction,
  props<{ payload: any }>()
);
export const saveInsChecklistSuccessAction = createAction(
  InspectionActionTypes.saveInsChecklistSuccessAction,
  props<{ response: any }>()
);