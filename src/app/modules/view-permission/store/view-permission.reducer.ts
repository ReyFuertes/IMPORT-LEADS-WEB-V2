import { createReducer, on, Action } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import * as _ from 'lodash';
import { IUserView } from "../view-permission.model";

export interface UserViewState extends EntityState<IUserView> {
}
export const adapter: EntityAdapter<IUserView> = createEntityAdapter<IUserView>({});
export const initialState: UserViewState = adapter.getInitialState({
});

const userViewReducer = createReducer(
  initialState,
);
export function UserViewReducer(state: UserViewState, action: Action) {
  return userViewReducer(state, action);
}