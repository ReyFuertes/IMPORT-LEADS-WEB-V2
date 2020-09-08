import { ISavedChecklistItem } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { saveChecklistSuccessAction, loadSavedChecklistSuccessAction } from '../actions/saved-checklist.action';

export interface SavedChecklistState extends EntityState<ISavedChecklistItem> {
}
export const adapter: EntityAdapter<ISavedChecklistItem> = createEntityAdapter<ISavedChecklistItem>({});
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
