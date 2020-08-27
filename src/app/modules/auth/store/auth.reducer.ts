import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { loginSuccessAction, isLoggingInAction } from './auth.action';

export interface AuthState {
}
export const initialState: AuthState = {
};
const authReducer = createReducer(
  initialState
);
export function AuthReducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}