import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { loginSuccessAction } from './auth.action';

export interface AuthState {
}
export const initialState: AuthState = {
};
const authReducer = createReducer(
  initialState,
  // on(loginSuccessAction, (state, action) => {
  //   return Object.assign({}, state, { token: action.accessToken, isLoggedin: true })
  // }),
);
export function AuthReducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}