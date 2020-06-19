import { ContractModuleState } from './index';
import { loadContractProductSuccess, updateContractProductsSuccess, preSelectProducts, clearPreSelectProducts, removePreSelectProduct } from './../actions/contract-product.action';
import { IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { addContractProductsSuccess } from '../actions/contract-product.action';
import * as _ from 'lodash';

export interface ContractProductsState extends EntityState<IContractProduct> {
  selectedProducts?: IContractProduct[]
}
export const adapter: EntityAdapter<IContractProduct> = createEntityAdapter<IContractProduct>({});
export const initialState: ContractProductsState = adapter.getInitialState({
  selectedProducts: null
});
const reducer = createReducer(
  initialState,
  on(removePreSelectProduct, (state, action) => {
    /* remove from preselected products */
    const newProducts = state.selectedProducts;
    _.remove(newProducts,
      (p: { id: string, _id: string }) => p.id === action.payload.id);
    return Object.assign({}, state, { selectedProducts: newProducts });
  }),
  on(clearPreSelectProducts, (state, action) => {
    return Object.assign({}, state, { selectedProducts: null });
  }),
  on(preSelectProducts, (state, action) => {
    return Object.assign({}, state, { selectedProducts: action.payload });
  }),
  on(addContractProductsSuccess, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  }),
  on(updateContractProductsSuccess, (state, action) => {
    return ({ ...adapter.updateOne({ id: action.updated.id, changes: action.updated }, state) })
  }),
  on(loadContractProductSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ContractProductsReducer(state: ContractProductsState, action: Action) {
  return reducer(state, action);
}
