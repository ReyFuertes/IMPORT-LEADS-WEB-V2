import { loadContractProductSuccess, updateContractProductsSuccess } from './../actions/products.action';
import { IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { addContractProductsSuccess } from '../actions/products.action';

export interface ProductsState extends EntityState<IContractProduct> {
}
export const adapter: EntityAdapter<IContractProduct> = createEntityAdapter<IContractProduct>({});
export const initialState: ProductsState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(addContractProductsSuccess, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  }),
  on(updateContractProductsSuccess, (state, action) => {
    return ({ ...adapter.updateOne({id: action.updated.id, changes: action.updated }, state) })
  }),
  on(loadContractProductSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ContractProductsReducer(state: ProductsState, action: Action) {
  return reducer(state, action);
}
