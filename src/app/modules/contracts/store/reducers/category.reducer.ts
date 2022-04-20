import { addCategorySuccessAction, deleteCategorySuccessAction, loadCategorySuccessAction, updateCategorysSuccess } from './../actions/category.action';
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
  on(deleteCategorySuccessAction, (state, action) => {
    return adapter.removeOne(action?.deleted?.id, state)
  }),
  on(loadCategorySuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  }),
  on(updateCategorysSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(addCategorySuccessAction, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  })
);
export function CategoryReducer(state: CategoryState, action: Action) {
  return reducer(state, action);
}
export const getCategory = (state: ContractModuleState) => {
  const contracts: ICategory[] = state && state.category.entities ? Object.values(state.category.entities) : null;
  return contracts?.sort((a: ICategory, b: ICategory) => sortByDesc(a, b, 'created_at'));
};
