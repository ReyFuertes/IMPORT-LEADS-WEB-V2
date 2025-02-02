import { loadContractProductSuccessAction, updateContractProductsSuccessAction, removeSelectedProductAction, selectProductAction } from './../actions/contract-product.action';
import { IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { addContractProductsSuccessAction } from '../actions/contract-product.action';
import * as _ from 'lodash';

export interface ContractProductsState extends EntityState<IContractProduct> {
  selectedProduct: IContractProduct
}
export const adapter: EntityAdapter<IContractProduct> = createEntityAdapter<IContractProduct>({});
export const initialState: ContractProductsState = adapter.getInitialState({
  selectedProduct: null
});
const reducer = createReducer(
  initialState,
  on(removeSelectedProductAction, (state) => {
    return Object.assign({}, state, { selectedProduct: null });
  }),
  on(selectProductAction, (state, action) => {
    let selectedProduct: IContractProduct = state.selectedProduct;
    if (state.selectedProduct && state.selectedProduct.id === action.item.id) {
      selectedProduct = null;
    } else {
      selectedProduct = action.item;
    }
    return Object.assign({}, state, { selectedProduct });
  }),
  on(addContractProductsSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  }),
  on(updateContractProductsSuccessAction, (state, action) => {
    return ({ ...adapter.updateOne({ id: action.updated.id, changes: action.updated }, state) })
  }),
  on(loadContractProductSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  })
);
export function ContractProductsReducer(state: ContractProductsState, action: Action) {
  return reducer(state, action);
}
