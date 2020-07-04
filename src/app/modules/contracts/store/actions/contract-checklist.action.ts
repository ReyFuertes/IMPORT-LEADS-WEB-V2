import { ICategory, IContractChecklist, IContractChecklistItem, IContractProduct } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CheckListActionTypes {
  addToChecklist = '[Contract Checklist] Add',
  addToChecklistSuccess = '[Contract Checklist] Add (success)',
  deleteChecklistItem = '[Contract Checklist] Delete',
  deleteChecklistItemSuccess = '[Contract Checklist] Delete (success)',
  clearChecklist = '[Contract Checklist] Clear',
  highlightChecklist = '[Contract Checklist] Highlight',
  loadChecklist = '[Inspection Checklist] load',
  loadChecklistSuccess = '[Inspection Checklist] load (success)',
  addTermToChecklistAction = '[Contract Checklist] select Term',
  removeSelectedTerm = '[Contract Checklist] remove selected Term',
  addToChecklistProductsAction = '[Contract Checklist] add product to checklist',
  removeToChecklistProductsAction = '[Contract Checklist] remove product to checklist',
  addToChecklistSourceAction = '[Contract Checklist] add to checklist source',
  removeToChecklistSourceAction = '[Contract Checklist] remove to checklist source',
}
export const removeToChecklistProductsAction = createAction(
  CheckListActionTypes.removeToChecklistProductsAction,
  props<{ item: IContractProduct }>()
);
export const addToChecklistProductsAction = createAction(
  CheckListActionTypes.addToChecklistProductsAction,
  props<{ item: IContractProduct }>()
);
export const addToChecklistSourceAction = createAction(
  CheckListActionTypes.addToChecklistSourceAction,
  props<{ item: IContractProduct }>()
);
export const removeToChecklistSourceAction = createAction(
  CheckListActionTypes.removeToChecklistSourceAction,
  props<{ item: IContractProduct }>()
);
export const removeSelectedTerm = createAction(
  CheckListActionTypes.removeSelectedTerm,
  props<{ id: string }>()
);

export const addTermToChecklistAction = createAction(
  CheckListActionTypes.addTermToChecklistAction,
  props<{ items: IContractChecklistItem[] }>()
);
export const loadChecklist = createAction(
  CheckListActionTypes.loadChecklist,
);
export const loadChecklistSuccess = createAction(
  CheckListActionTypes.loadChecklistSuccess,
  props<{ items: IContractChecklistItem[] }>()
);
export const deleteChecklistItem = createAction(
  CheckListActionTypes.deleteChecklistItem,
  props<{ payload: IContractChecklistItem[] }>()
);
export const deleteChecklistItemSuccess = createAction(
  CheckListActionTypes.deleteChecklistItemSuccess,
  props<{ deleted: IContractChecklistItem[] }>()
);
export const highlightChecklist = createAction(
  CheckListActionTypes.highlightChecklist,
  props<{ highlight: boolean }>()
);
export const clearChecklist = createAction(
  CheckListActionTypes.clearChecklist
);
export const addToChecklist = createAction(
  CheckListActionTypes.addToChecklist,
  props<{ payload: IContractChecklist }>()
);
export const addToChecklistSuccess = createAction(
  CheckListActionTypes.addToChecklistSuccess,
  props<{ items: IContractChecklistItem[] }>()
);
