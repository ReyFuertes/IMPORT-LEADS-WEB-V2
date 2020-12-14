import { IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';

export interface ContractTemplateState extends EntityState<IContractProduct> {
  selectedProduct: IContractProduct
}
export const adapter: EntityAdapter<IContractProduct> = createEntityAdapter<IContractProduct>({});
export const initialState: ContractTemplateState = adapter.getInitialState({
  selectedProduct: null
});
const reducer = createReducer(
  initialState,
);
export function ContractTemplateReducer(state: ContractTemplateState, action: Action) {
  return reducer(state, action);
}
