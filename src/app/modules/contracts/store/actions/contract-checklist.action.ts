import { ICategory, IContractChecklist, IContractChecklistItem, IContractProduct, IOverrideChecklistItem, IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CheckListActionTypes {
  addToChecklistAction = '[Contract Checklist] Add',
  addToChecklistSuccessAction = '[Contract Checklist] Add (success)',
  removeChecklistItemsAction = '[Contract Checklist] Delete',
  removeChecklistItemsSuccessAction = '[Contract Checklist] Delete (success)',
  clearChecklistAction = '[Contract Checklist] Clear',
  highlightChecklistAction = '[Contract Checklist] Highlight',
  loadChecklistAction = '[Inspection Checklist] load',
  loadChecklistSuccessAction = '[Inspection Checklist] load (success)',
  addTermToChecklistAction = '[Contract Checklist] add Term',
  removeSelectedTermsAction = '[Contract Checklist] remove selected Terms',
  addToChecklistProductsAction = '[Contract Checklist] add product to checklist',
  removeToChecklistProductsAction = '[Contract Checklist] remove product to checklist',
  addToChecklistSourceAction = '[Contract Checklist] add to checklist source',
  updateChecklistSourceAction = '[Contract Checklist] remove to checklist source',
  overrideChecklistItemAction = '[Contract Checklist] override checklist item',
  overrideChecklistItemActionSuccess = '[Contract Checklist] override checklist item (success)',
  removeChecklistItemAction = '[Contract Checklist] remove checklist item',
  removeAllSelectedTerms = '[Contract Checklist] remove all terms',
  preSelectChecklistProductsAction = '[Contract Checklist] preselect checklist products',
  removeAllChecklistProductsAction = '[Contract Checklist] remove all checklist products',
  removeChecklistSourceAction = '[Contract Checklist] remove all checklist source',
}
export const removeChecklistSourceAction = createAction(
  CheckListActionTypes.removeChecklistSourceAction
);
export const removeAllChecklistProductsAction = createAction(
  CheckListActionTypes.removeAllChecklistProductsAction
);
export const preSelectChecklistProductsAction = createAction(
  CheckListActionTypes.preSelectChecklistProductsAction,
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
export const updateChecklistSourceAction = createAction(
  CheckListActionTypes.updateChecklistSourceAction,
  props<{ item: IContractProduct }>()
);
export const removeSelectedTermsAction = createAction(
  CheckListActionTypes.removeSelectedTermsAction,
  props<{ ids: string[] }>()
);
export const addTermToChecklistAction = createAction(
  CheckListActionTypes.addTermToChecklistAction,
  props<{ ids: string[] }>()
);
export const loadChecklistAction = createAction(
  CheckListActionTypes.loadChecklistAction,
);
export const loadChecklistSuccessAction = createAction(
  CheckListActionTypes.loadChecklistSuccessAction,
  props<{ items: IContractChecklistItem[] }>()
);
export const removeChecklistItemsAction = createAction(
  CheckListActionTypes.removeChecklistItemsAction,
  props<{ payload: IContractChecklistItem[] }>()
);
export const removeChecklistItemsSuccessAction = createAction(
  CheckListActionTypes.removeChecklistItemsSuccessAction,
  props<{ deleted: IContractChecklistItem[] }>()
);
export const highlightChecklistAction = createAction(
  CheckListActionTypes.highlightChecklistAction,
  props<{ highlight: boolean }>()
);
export const clearChecklistAction = createAction(
  CheckListActionTypes.clearChecklistAction
);
export const addToChecklistAction = createAction(
  CheckListActionTypes.addToChecklistAction,
  props<{ payload: IContractChecklist }>()
);
export const addToChecklistSuccessAction = createAction(
  CheckListActionTypes.addToChecklistSuccessAction,
  props<{ item: IContractChecklistItem }>()
);
