import { updateContractTermSuccess } from './../actions/contract-term.actions';
import { addCategorySuccess, updateCategorysSuccess } from './../actions/category.action';
import { sortByDesc } from 'src/app/shared/util/sort';
import { ICategory } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { ContractModuleState } from './index';

export interface CategoryState extends EntityState<ICategory> {
}
export const adapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({});
export const initialState: CategoryState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(updateCategorysSuccess, (state, action) => {
    debugger
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(addCategorySuccess, (state, action) => {
    debugger
    return ({ ...adapter.addOne(action.created, state) })
  })
);
export function CategoryReducer(state: CategoryState, action: Action) {
  return reducer(state, action);
}
export const getCategory = (state: ContractModuleState) => {
  const contracts: ICategory[] = state && state.category.entities ? Object.values(state.category.entities) : null;
  return contracts && contracts.sort((a: ICategory, b: ICategory) => sortByDesc(a, b, 'created_at'));
};
