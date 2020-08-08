import { saveChecklistItemSuccessAction } from './../actions/saved-checklist-item.action';
import { sortByDesc } from 'src/app/shared/util/sort';
import { ISavedChecklistItem } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface SavedChecklistItemState extends EntityState<ISavedChecklistItem> {
}
export const adapter: EntityAdapter<ISavedChecklistItem> = createEntityAdapter<ISavedChecklistItem>({});
export const initialState: SavedChecklistItemState = adapter.getInitialState({
});
const reducer = createReducer(
  initialState
);
export function SavedChecklistItemReducer(state: SavedChecklistItemState, action: Action) {
  return reducer(state, action);
}
