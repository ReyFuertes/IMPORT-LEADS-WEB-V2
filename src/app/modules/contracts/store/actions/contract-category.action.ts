import { IContractCategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addContractCategory = '[Contract Category] Add',
  addContractCategorySuccess = '[Contract Category] Add (success)',
  loadContractCategory = '[Contract Category] Load]',
  loadContractCategorySuccess = '[Contract Category] Load (success)',
  updateContractCategory = '[Contract Category] Update',
  updateContractCategorySuccess = '[Contract Category] Update (success)',
  deleteContractCategory = '[Contract Category] Delete',
  deleteContractCategorySuccess = '[Contract Category] Delete (success)'
}
export const deleteContractCategory = createAction(
  CategoryActionTypes.deleteContractCategory,
  props<{ id: string }>()
);
export const deleteContractCategorySuccess = createAction(
  CategoryActionTypes.deleteContractCategorySuccess,
  props<{ deleted: IContractCategory }>()
);
export const updateContractCategory = createAction(
  CategoryActionTypes.updateContractCategory,
  props<{ payload: IContractCategory }>()
);
export const updateContractCategorySuccess = createAction(
  CategoryActionTypes.updateContractCategorySuccess,
  props<{ updated: IContractCategory }>()
);
export const loadContractCategory = createAction(
  CategoryActionTypes.loadContractCategory,
  props<{ id: string }>()
);
export const loadContractCategorySuccess = createAction(
  CategoryActionTypes.loadContractCategorySuccess,
  props<{ items: IContractCategory[] }>()
);
export const addContractCategory = createAction(
  CategoryActionTypes.addContractCategory,
  props<{ payload: IContractCategory }>()
);
export const addContractCategorySuccess = createAction(
  CategoryActionTypes.addContractCategorySuccess,
  props<{ created: IContractCategory }>()
);
