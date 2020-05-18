import { ICategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addCategory = '[Category] Add',
  addCategorySuccess = '[Category] Add (success)',
  updateCategory = '[Category] Update',
  updateCategorySuccess = '[Category] Update (success)',
}

export const updateCategory = createAction(
  CategoryActionTypes.updateCategory,
  props<{ payload: ICategory }>()
);
export const updateCategorysSuccess = createAction(
  CategoryActionTypes.updateCategorySuccess,
  props<{ updated: ICategory }>()
);
export const addCategory = createAction(
  CategoryActionTypes.addCategory,
  props<{ payload: ICategory }>()
);
export const addCategorySuccess = createAction(
  CategoryActionTypes.addCategorySuccess,
  props<{ created: ICategory }>()
);
