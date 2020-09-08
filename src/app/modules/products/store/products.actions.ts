import { IProduct } from './../products.model';
import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProducts = '[Products] Load',
  LoadProductsSuccess = '[Products] Load (success)',
  addProduct = '[Products] Create',
  addProductSuccessAction = '[Products] Create (success)',
  deleteProduct = '[Products] Delete',
  deleteProductSuccessAction = '[Products] Delete (success)',
  updateProduct = '[Products] Update',
  updateProductSuccessAction = '[Products] Update (success)',
}
export const updateProduct = createAction(
  ProductsActionTypes.updateProduct,
  props<{ item: IProduct }>()
);
export const updateProductSuccessAction = createAction(
  ProductsActionTypes.updateProductSuccessAction,
  props<{ updated: IProduct }>()
);
export const deleteProduct = createAction(
  ProductsActionTypes.deleteProduct,
  props<{ id: string }>()
);
export const deleteProductSuccessAction = createAction(
  ProductsActionTypes.deleteProductSuccessAction,
  props<{ deleted: IProduct }>()
);
export const addProduct = createAction(
  ProductsActionTypes.addProduct,
  props<{ item: IProduct }>()
);
export const addProductSuccessAction = createAction(
  ProductsActionTypes.addProductSuccessAction,
  props<{ created: IProduct }>()
);
export const loadProductsAction = createAction(
  ProductsActionTypes.LoadProducts
);
export const loadProductsSuccessAction = createAction(
  ProductsActionTypes.LoadProductsSuccess,
  props<{ items: IProduct[] }>()
);
