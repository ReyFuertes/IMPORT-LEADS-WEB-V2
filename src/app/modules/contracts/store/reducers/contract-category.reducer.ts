import { sortCreatedAt } from 'src/app/shared/util/sort';
import { ContractModuleState } from './index';
import { addContractCategorySuccess, loadContractCategorySuccess, deleteContractCategorySuccess } from './../actions/contract-category.action';
import { IContractCategory } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractCategoryState extends EntityState<IContractCategory> {
}
export const adapter: EntityAdapter<IContractCategory> = createEntityAdapter<IContractCategory>({});
export const initialState: ContractCategoryState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(deleteContractCategorySuccess, (state, action) => {
    return ({ ...adapter.removeOne(action.deleted.id, state) })
  }),
  on(addContractCategorySuccess, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  }),
  on(loadContractCategorySuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ContractCategoryReducer(state: ContractCategoryState, action: Action) {
  return reducer(state, action);
}
export const getContractCategory = (state: ContractModuleState) => {
  const contracts: IContractCategory[] = state && state.contractCategory.entities ? Object.values(state.contractCategory.entities) : null;
  return contracts && contracts.sort((a: IContractCategory, b: IContractCategory) => sortCreatedAt(a, b));
};
