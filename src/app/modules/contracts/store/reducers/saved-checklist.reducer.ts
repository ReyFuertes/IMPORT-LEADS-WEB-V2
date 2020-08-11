import { saveChecklistItemSuccessAction } from './../actions/saved-checklist-item.action';
import { sortByDesc } from 'src/app/shared/util/sort';
import { ISavedChecklist } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { saveChecklistSuccessAction, loadSavedChecklistSuccessAction } from '../actions/saved-checklist.action';

export interface SavedChecklistState extends EntityState<ISavedChecklist> {
}
export const adapter: EntityAdapter<ISavedChecklist> = createEntityAdapter<ISavedChecklist>({});
export const initialState: SavedChecklistState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState,
  on(loadSavedChecklistSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(saveChecklistSuccessAction, (state, action) => {
    return ({ ...adapter.addOne(action.created, state) })
  })
);
export function SavedChecklistReducer(state: SavedChecklistState, action: Action) {
  return reducer(state, action);
}
