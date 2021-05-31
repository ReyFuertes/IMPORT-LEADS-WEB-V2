import { IContractCategory, IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addContractCategoryAction = '[Contract Category] Add',
  addContractCategoryActionSuccess = '[Contract Category] Add (success)',
  loadContractCategoryAction = '[Contract Category] Load]',
  loadContractCategoryActionSuccess = '[Contract Category] Load (success)',
  updateContractCategoryAction = '[Contract Category] Update',
  updateContractCategoryActionSuccess = '[Contract Category] Update (success)',
  deleteContractCategoryAction = '[Contract Category] Delete',
  deleteContractCategoryActionSuccess = '[Contract Category] Delete (success)',
  selTermsForChecklistAction = '[Contract Category] select terms',
  moveUpContractCategoryAction = '[Contract Category] move up',
  moveUpContractCategoryActionSuccess = '[Contract Category] move up (success)',
  moveDownContractCategoryAction = '[Contract Category] move down',
  moveDownContractCategoryActionSuccess = '[Contract Category] move down (success)',
  loadAllContractCategoryAction = '[Contract Category] load all contract',
  loadAllContractCategoryActionSuccess = '[Contract Category] load all contract (success)',
  addMultipleContractCategoryAction = '[Contract Category] Add multiple',
  addMultipleContractCategoryActionSuccess = '[Contract Category] Add multiple (success)',
}
export const addMultipleContractCategoryAction = createAction(
  CategoryActionTypes.addMultipleContractCategoryAction,
  props<{ payload: IContractCategory }>()
);
export const addMultipleContractCategoryActionSuccess = createAction(
  CategoryActionTypes.addMultipleContractCategoryActionSuccess,
  props<{ created: IContractCategory[] }>()
);
export const loadAllContractCategoryAction = createAction(
  CategoryActionTypes.loadAllContractCategoryAction
);
export const loadAllContractCategoryActionSuccess = createAction(
  CategoryActionTypes.loadAllContractCategoryActionSuccess,
  props<{ response: any }>()
);
export const moveDownContractCategoryAction = createAction(
  CategoryActionTypes.moveDownContractCategoryAction,
  props<{ payload: IContractCategory }>()
);
export const moveDownContractCategoryActionSuccess = createAction(
  CategoryActionTypes.moveDownContractCategoryActionSuccess,
  props<{ response: any }>()
);
export const moveUpContractCategoryAction = createAction(
  CategoryActionTypes.moveUpContractCategoryAction,
  props<{ payload: IContractCategory }>()
);
export const moveUpContractCategoryActionSuccess = createAction(
  CategoryActionTypes.moveUpContractCategoryActionSuccess,
  props<{ response: any }>()
);
export const selTermsForChecklistAction = createAction(
  CategoryActionTypes.selTermsForChecklistAction,
  props<{ term: IContractTerm }>()
);
export const deleteContractCategoryAction = createAction(
  CategoryActionTypes.deleteContractCategoryAction,
  props<{ id: string }>()
);
export const deleteContractCategoryActionSuccess = createAction(
  CategoryActionTypes.deleteContractCategoryActionSuccess,
  props<{ deleted: IContractCategory }>()
);
export const updateContractCategoryAction = createAction(
  CategoryActionTypes.updateContractCategoryAction,
  props<{ payload: IContractCategory }>()
);
export const updateContractCategoryActionSuccess = createAction(
  CategoryActionTypes.updateContractCategoryActionSuccess,
  props<{ updated: IContractCategory }>()
);
export const loadContractCategoryAction = createAction(
  CategoryActionTypes.loadContractCategoryAction,
  props<{ id: string }>()
);
export const loadContractCategoryActionSuccess = createAction(
  CategoryActionTypes.loadContractCategoryActionSuccess,
  props<{ items: IContractCategory[] }>()
);
export const addContractCategoryAction = createAction(
  CategoryActionTypes.addContractCategoryAction,
  props<{ payload: IContractCategory }>()
);
export const addContractCategoryActionSuccess = createAction(
  CategoryActionTypes.addContractCategoryActionSuccess,
  props<{ created: IContractCategory }>()
);
