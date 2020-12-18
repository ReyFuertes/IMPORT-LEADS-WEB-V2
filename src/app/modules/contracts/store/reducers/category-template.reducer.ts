import { ICategoryTemplate } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as _ from 'lodash';
import { loadCategoryTemplatesSuccessAction } from '../actions/Category-template.action';
export interface CategoryTemplateState extends EntityState<ICategoryTemplate> {
 
}
export const adapter: EntityAdapter<ICategoryTemplate> = createEntityAdapter<ICategoryTemplate>({});
export const initialState: CategoryTemplateState = adapter.getInitialState({
  
});
const reducer = createReducer(
  initialState,
  on(loadCategoryTemplatesSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) })
  })
);
export function CategoryTemplateReducer(state: CategoryTemplateState, action: Action) {
  return reducer(state, action);
}