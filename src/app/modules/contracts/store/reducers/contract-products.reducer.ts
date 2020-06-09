import { loadContractProductSuccess, updateContractProductsSuccess, setChecklistProduct } from './../actions/contract-products.action';
import { IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { addContractProductsSuccess } from '../actions/contract-products.action';

export interface ContractProductsState extends EntityState<IContractProduct> {
  checklistProducts?: IContractProduct[]
}
export const adapter: EntityAdapter<IContractProduct> = createEntityAdapter<IContractProduct>({});
export const initialState: ContractProductsState = adapter.getInitialState({
  checklistProducts: null
});
const reducer = createReducer(
  initialState,
  on(setChecklistProduct, (state, action) => {
    return Object.assign({}, state, { checklistProducts: action.payload });
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
export const getChecklistProducts = (state: ContractProductsState) => state.checklistProducts;
