import { IContractProduct, IContract } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ProductActionTypes {
  loadContractProduct = '[Contract Product] Load]',
  loadContractProductSuccess = '[Contract Product] Load (success)',
  addContractProduct = '[Product] Add',
  addContractProductsSuccess = '[Product] Add (success)',
  updateContractProduct = '[Product] Update',
  updateContractProductsSuccess = '[Product] Update (success)',
  deleteContractProduct = '[Product] Delete',
  preSelectProducts = '[Contract Product] PreSelect Products',
  clearPreSelectProducts = '[Contract Product] Clear PreSelect Products'
}
export const clearPreSelectProducts = createAction(
  ProductActionTypes.clearPreSelectProducts,
);
export const preSelectProducts = createAction(
  ProductActionTypes.preSelectProducts,
  props<{ payload: IContractProduct[] }>()
);
export const updateContractProduct = createAction(
  ProductActionTypes.updateContractProduct,
  props<{ payload: IContractProduct }>()
);
export const updateContractProductsSuccess = createAction(
  ProductActionTypes.updateContractProductsSuccess,
  props<{ updated: IContractProduct }>()
);
export const deleteContractProduct = createAction(
  ProductActionTypes.deleteContractProduct,
  props<{ id: string }>()
);
export const addContractProducts = createAction(
  ProductActionTypes.addContractProduct,
  props<{ payload: IContractProduct }>()
);
export const addContractProductsSuccess = createAction(
  ProductActionTypes.addContractProductsSuccess,
  props<{ created: IContractProduct }>()
);
export const loadContractProducts = createAction(
  ProductActionTypes.loadContractProduct,
  props<{ id: string }>()
);
export const loadContractProductSuccess = createAction(
  ProductActionTypes.loadContractProductSuccess,
  props<{ items: IContractProduct[] }>()
);
