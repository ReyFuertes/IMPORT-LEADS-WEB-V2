import { IContractCategoryTemplate } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { deleteContractCategoryTemplateSuccessAction, loadContractCategoryTemplateSuccessAction } from '../actions/contract-category-template.action';

export interface ContractCategoryTemplateState extends EntityState<IContractCategoryTemplate> {
}
export const adapter: EntityAdapter<IContractCategoryTemplate> = createEntityAdapter<IContractCategoryTemplate>({});
export const initialState: ContractCategoryTemplateState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(deleteContractCategoryTemplateSuccessAction, (state, action) => {
    return adapter.removeOne(action?.deleted?.id, state)
  }),
  on(loadContractCategoryTemplateSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  })
);
export function ContractCategoryTemplateReducer(state: ContractCategoryTemplateState, action: Action) {
  return reducer(state, action);
}