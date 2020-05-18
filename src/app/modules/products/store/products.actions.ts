import { IProduct } from './../products.model';
import { createAction, props } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProducts = '[Products] Load',
  LoadProductsSuccess = '[Products] Load (success)',
  addProduct = '[Products] Create',
  addProductSuccess = '[Products] Create (success)',
  deleteProduct = '[Products] Delete',
  deleteProductSuccess = '[Products] Delete (success)',
  updateProduct = '[Products] Update',
  updateProductSuccess = '[Products] Update (success)',
}
export const updateProduct = createAction(
  ProductsActionTypes.updateProduct,
  props<{ item: IProduct }>()
);
export const updateProductSuccess = createAction(
  ProductsActionTypes.updateProductSuccess,
  props<{ updated: IProduct }>()
);
export const deleteProduct = createAction(
  ProductsActionTypes.deleteProduct,
  props<{ id: string }>()
);
export const deleteProductSuccess = createAction(
  ProductsActionTypes.deleteProductSuccess,
  props<{ deleted: IProduct }>()
);
export const addProduct = createAction(
  ProductsActionTypes.addProduct,
  props<{ item: IProduct }>()
);
export const addProductSuccess = createAction(
  ProductsActionTypes.addProductSuccess,
  props<{ created: IProduct }>()
);
export const loadProducts = createAction(
  ProductsActionTypes.LoadProducts
);
export const loadProductsSuccess = createAction(
  ProductsActionTypes.LoadProductsSuccess,
  props<{ items: IProduct[] }>()
);
