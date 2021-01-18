import { IProduct } from './../products.model';
import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProductsAction = '[Products] Load',
  LoadProductsSuccessAction = '[Products] Load (success)',
  addProductAction = '[Products] Create',
  addProductSuccessAction = '[Products] Create (success)',
  deleteProductAction = '[Products] Delete',
  deleteProductSuccessAction = '[Products] Delete (success)',
  updateProductAction = '[Products] Update',
  updateProductSuccessAction = '[Products] Update (success)',
}
export const updateProductAction = createAction(
  ProductsActionTypes.updateProductAction,
  props<{ item: IProduct }>()
);
export const updateProductSuccessAction = createAction(
  ProductsActionTypes.updateProductSuccessAction,
  props<{ updated: IProduct }>()
);
export const deleteProductAction = createAction(
  ProductsActionTypes.deleteProductAction,
  props<{ id: string }>()
);
export const deleteProductSuccessAction = createAction(
  ProductsActionTypes.deleteProductSuccessAction,
  props<{ deleted: IProduct }>()
);
export const addProductAction = createAction(
  ProductsActionTypes.addProductAction,
  props<{ item: IProduct }>()
);
export const addProductSuccessAction = createAction(
  ProductsActionTypes.addProductSuccessAction,
  props<{ created: IProduct }>()
);
export const loadProductsAction = createAction(
  ProductsActionTypes.LoadProductsAction
);
export const loadProductsSuccessAction = createAction(
  ProductsActionTypes.LoadProductsSuccessAction,
  props<{ items: IProduct[] }>()
);
