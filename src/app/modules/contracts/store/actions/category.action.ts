import { ICategory } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum CategoryActionTypes {
  addCategoryAction = '[Category] Add',
  addCategorySuccess = '[Category] Add (success)',
  updateCategoryAction = '[Category] Update',
  updateCategorySuccess = '[Category] Update (success)',
}

export const updateCategoryAction = createAction(
  CategoryActionTypes.updateCategoryAction,
  props<{ payload: ICategory }>()
);
export const updateCategorysSuccess = createAction(
  CategoryActionTypes.updateCategorySuccess,
  props<{ updated: ICategory }>()
);
export const addCategoryAction = createAction(
  CategoryActionTypes.addCategoryAction,
  props<{ payload: ICategory }>()
);
export const addCategorySuccess = createAction(
  CategoryActionTypes.addCategorySuccess,
  props<{ created: ICategory }>()
);
