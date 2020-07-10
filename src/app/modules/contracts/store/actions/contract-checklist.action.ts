import { ICategory, IContractChecklist, IContractChecklistItem, IContractProduct, IOverrideChecklistItem, IContractTerm } from './../../contract.model';
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
  addTermToChecklistAction = '[Contract Checklist] add Term',
  removeSelectedTerms = '[Contract Checklist] remove selected Terms',
  addToChecklistProductsAction = '[Contract Checklist] add product to checklist',
  removeToChecklistProductsAction = '[Contract Checklist] remove product to checklist',
  addToChecklistSourceAction = '[Contract Checklist] add to checklist source',
  removeToChecklistSourceAction = '[Contract Checklist] remove to checklist source',
  overrideChecklistItemAction = '[Contract Checklist] override checklist item',
  overrideChecklistItemActionSuccess = '[Contract Checklist] override checklist item (success)',
  removeChecklistItemAction = '[Contract Checklist] remove checklist item',
  removeAllSelectedTerms = '[Contract Checklist] remove all terms',
  preSelectChecklistProducts = '[Contract Checklist] preselect checklist products'
}
export const preSelectChecklistProducts = createAction(
  CheckListActionTypes.preSelectChecklistProducts,
  props<{ item: IContractProduct[] }>()
);
export const removeAllSelectedTerms = createAction(
  CheckListActionTypes.removeAllSelectedTerms
);
export const removeChecklistItemAction = createAction(
  CheckListActionTypes.removeChecklistItemAction,
  props<{ item: IContractChecklistItem }>()
);
export const overrideChecklistItemAction = createAction(
  CheckListActionTypes.overrideChecklistItemAction,
  props<{ item: IOverrideChecklistItem }>()
);
export const overrideChecklistItemActionSuccess = createAction(
  CheckListActionTypes.overrideChecklistItemActionSuccess,
  props<{ items: IContractChecklistItem[] }>()
);
export const removeToChecklistProductsAction = createAction(
  CheckListActionTypes.removeToChecklistProductsAction,
  props<{ item: IContractProduct }>()
);
export const addToChecklistProductsAction = createAction(
  CheckListActionTypes.addToChecklistProductsAction,
  props<{ items: IContractProduct[] }>()
);
export const addToChecklistSourceAction = createAction(
  CheckListActionTypes.addToChecklistSourceAction,
  props<{ item: IContractChecklistItem }>()
);
export const removeToChecklistSourceAction = createAction(
  CheckListActionTypes.removeToChecklistSourceAction,
  props<{ item: IContractProduct }>()
);
export const removeSelectedTerms = createAction(
  CheckListActionTypes.removeSelectedTerms,
  props<{ ids: string[] }>()
);
export const addTermToChecklistAction = createAction(
  CheckListActionTypes.addTermToChecklistAction,
  props<{ items: string[] }>()
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
