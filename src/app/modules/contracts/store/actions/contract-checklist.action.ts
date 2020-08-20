import { ICategory, IContractChecklist, IContractChecklistItem, IContractProduct, IOverrideChecklistItem, IContractTerm, ICommonIdPayload, IContractTermProduct, ISavedChecklistItem } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CheckListActionTypes {
  removeTermFormChecklistAction = '[Contract Checklist] remove selected Terms',
  addItemToChecklistProductsAction = '[Contract Checklist] add product to checklist',
  removeItemFromChecklistProductsAction = '[Contract Checklist] remove product to checklist',
  addItemToSourceAction = '[Contract Checklist] add to checklist source',
  addItemToChecklistTermsAction = '[Contract Checklist] add Term',
  setToMultiUpdateStatusAction = '[Contract Checklist] set multi update status',
  resetUpdateStatusAction = '[Contract Checklist] reset status',
  addItemToChecklistItemsAction = '[Contract Checklist] add checklist items',
  processItemsToChecklistAction = '[Contract Checklist] process checklist items',
  clearAllSelectedTerms = '[Contract Checklist] clear all terms',
  loadChecklistAction = '[Inspection Checklist] load checklist items',
  loadChecklistSuccessAction = '[Inspection Checklist] load checklist items (success)',
  clearChecklistSourceAction = '[Contract Checklist] clear checklist source',
  addItemToChecklistEntitiesAction = '[Contract Checklist] add item to entities',
  processItemsToChecklistEntitiesAction = '[Contract Checklist] process checklist entities',
  removeItemFromEntitiesAction = '[Contract Checklist] remove item from checklist entities',
  clearChecklistProductsAction = '[Contract Checklist] remove all checklist products',
  removeItemFromEntitiesByProductId = '[Contract Checklist] remove item from entities by product id',
  clearEntitiesAction = '[Contract Checklist] clear all entities',
}
export const clearEntitiesAction = createAction(
  CheckListActionTypes.clearEntitiesAction
);
export const removeItemFromEntitiesByProductId = createAction(
  CheckListActionTypes.removeItemFromEntitiesByProductId,
  props<{ id: string }>()
);
export const clearChecklistProductsAction = createAction(
  CheckListActionTypes.clearChecklistProductsAction
);
export const removeItemFromEntitiesAction = createAction(
  CheckListActionTypes.removeItemFromEntitiesAction,
  props<{ item: IContractChecklistItem }>()
);
/* ADD ITEM TO CHECKLIST TERMS */
export const processItemsToChecklistEntitiesAction = createAction(
  CheckListActionTypes.processItemsToChecklistEntitiesAction
);
export const addItemToChecklistEntitiesAction = createAction(
  CheckListActionTypes.addItemToChecklistEntitiesAction,
  props<{ item: IContractChecklistItem }>()
);
export const loadChecklistAction = createAction(
  CheckListActionTypes.loadChecklistAction,
);
export const loadChecklistSuccessAction = createAction(
  CheckListActionTypes.loadChecklistSuccessAction,
  props<{ items: IContractChecklistItem[] }>()
);
/* CLEAR ALL CHECKLIST TERMS */
export const clearAllSelectedTerms = createAction(
  CheckListActionTypes.clearAllSelectedTerms
);
/* ADD ITEM TO CHECKLIST TERMS */
export const processItemsToChecklistAction = createAction(
  CheckListActionTypes.processItemsToChecklistAction
);
export const addItemToChecklistItemsAction = createAction(
  CheckListActionTypes.addItemToChecklistItemsAction,
  props<{ item: IContractChecklistItem }>()
);
/* SET STATUS RESET*/
export const resetUpdateStatusAction = createAction(
  CheckListActionTypes.resetUpdateStatusAction
);
/* SET STATUS TO MULTI UPDATE */
export const setToMultiUpdateStatusAction = createAction(
  CheckListActionTypes.setToMultiUpdateStatusAction
);
/* ADD ITEM TO CHECKLIST OF PRODUCTS */
export const addItemToChecklistProductsAction = createAction(
  CheckListActionTypes.addItemToChecklistProductsAction,
  props<{ item: ICommonIdPayload }>()
);
/* REMOVE ITEM TO CHECKLIST OF PRODUCTS */
export const removeItemFromChecklistProductsAction = createAction(
  CheckListActionTypes.removeItemFromChecklistProductsAction,
  props<{ item: ICommonIdPayload }>()
);
/* ADD ITEM TO CHECKLIST OF SOURCE */
export const addItemToSourceAction = createAction(
  CheckListActionTypes.addItemToSourceAction,
  props<{ item: ICommonIdPayload }>()
);
/* ADD ITEM TO CHECKLIST TERMS */
export const addItemToChecklistTermsAction = createAction(
  CheckListActionTypes.addItemToChecklistTermsAction,
  props<{ term: IContractTermProduct }>()
);
export const removeTermFormChecklistAction = createAction(
  CheckListActionTypes.removeTermFormChecklistAction,
  props<{ term: IContractTermProduct }>()
);





export const clearChecklistSourceAction = createAction(
  CheckListActionTypes.clearChecklistSourceAction
);

