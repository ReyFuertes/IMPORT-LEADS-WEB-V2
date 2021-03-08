import { createReducer, on, Action } from "@ngrx/store";
import { changeUserPasswordSuccessAction } from '../actions/user.actions';

export interface UserState {}

export const initialState: UserState = {};

const userReducer = createReducer(
  initialState
);
export function UserReducer(state: UserState, action: Action) {
  return userReducer(state, action);
}