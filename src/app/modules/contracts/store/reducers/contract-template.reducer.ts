import { IContractProduct, IContractTemplate, IContractTemplatePayload } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { loadContractTemplatesSuccessAction } from '../actions/contract-template.action';

export interface ContractTemplateState extends EntityState<IContractTemplate> {
  selectedProduct: IContractTemplate,
}
export const adapter: EntityAdapter<IContractTemplate> = createEntityAdapter<IContractTemplate>({});
export const initialState: ContractTemplateState = adapter.getInitialState({
  selectedProduct: null
});
const reducer = createReducer(
  initialState,
  on(loadContractTemplatesSuccessAction, (state, action) => {
    
    return ({ ...adapter.setAll(action.response, state) })
  })
);
export function ContractTemplateReducer(state: ContractTemplateState, action: Action) {
  return reducer(state, action);
}
