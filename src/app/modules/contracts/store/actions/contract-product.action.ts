import { IContractProduct, IContract } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  loadContractProduct = '[Contract Product] Load]',
  loadContractProductSuccessAction = '[Contract Product] Load (success)',
  addContractProduct = '[Product] Add',
  addContractProductsSuccessAction = '[Product] Add (success)',
  updateContractProductAction = '[Product] Update',
  updateContractProductsSuccessAction = '[Product] Update (success)',
  deleteContractProductAction = '[Product] Delete',
  selectProductAction = '[Contract Product] select Product',
  clearPreSelectProducts = '[Contract Product] Clear PreSelect Products',
  removeSelectedProductAction = '[Contract Product] Remove select Product'
}
export const removeSelectedProductAction = createAction(
  ProductActionTypes.removeSelectedProductAction
);
export const clearPreSelectProducts = createAction(
  ProductActionTypes.clearPreSelectProducts,
);
export const selectProductAction = createAction(
  ProductActionTypes.selectProductAction,
  props<{ item: IContractProduct }>()
);
export const updateContractProductAction = createAction(
  ProductActionTypes.updateContractProductAction,
  props<{ payload: IContractProduct }>()
);
export const updateContractProductsSuccessAction = createAction(
  ProductActionTypes.updateContractProductsSuccessAction,
  props<{ updated: IContractProduct }>()
);
export const deleteContractProductAction = createAction(
  ProductActionTypes.deleteContractProductAction,
  props<{ id: string }>()
);
export const addContractProductsAction = createAction(
  ProductActionTypes.addContractProduct,
  props<{ payload: IContractProduct }>()
);
export const addContractProductsSuccessAction = createAction(
  ProductActionTypes.addContractProductsSuccessAction,
  props<{ response: IContractProduct[] }>()
);
export const loadContractProductsAction = createAction(
  ProductActionTypes.loadContractProduct,
  props<{ id: string }>()
);
export const loadContractProductSuccessAction = createAction(
  ProductActionTypes.loadContractProductSuccessAction,
  props<{ response: IContractProduct[] }>()
);
