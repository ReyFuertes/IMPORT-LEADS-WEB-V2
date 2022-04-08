import { ICategory, IContractCategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addCategoryAction = '[Category] Add',
  addCategorySuccessAction = '[Category] Add (success)',
  updateCategoryAction = '[Category] Update',
  updateCategorySuccessAction = '[Category] Update (success)',
  loadCategoryAction = '[Category] load',
  loadCategorySuccessAction = '[Category] load (success)',
}
export const loadCategoryAction = createAction(
  CategoryActionTypes.loadCategoryAction
);
export const loadCategorySuccessAction = createAction(
  CategoryActionTypes.loadCategorySuccessAction,
  props<{ response: ICategory[] }>()
);
export const updateCategoryAction = createAction(
  CategoryActionTypes.updateCategoryAction,
  props<{ payload: ICategory, contractCategory?: IContractCategory }>()
);
export const updateCategorysSuccess = createAction(
  CategoryActionTypes.updateCategorySuccessAction,
  props<{ updated: ICategory }>()
);
export const addCategoryAction = createAction(
  CategoryActionTypes.addCategoryAction,
  props<{ payload: ICategory }>()
);
export const addCategorySuccessAction = createAction(
  CategoryActionTypes.addCategorySuccessAction,
  props<{ created: ICategory }>()
);
