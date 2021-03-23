import { createReducer, on, Action } from "@ngrx/store";
import {  loginFailedAction } from './auth.action';
export interface AuthState {
  loginError: any
}
export const initialState: AuthState = {
  loginError: null
};
const authReducer = createReducer(
  initialState,
  on(loginFailedAction, (state) => {
    return Object.assign({}, state, { loginError: true });
  })
  
);
export function AuthReducer(state: AuthState, action: Action) {
  return authReducer(state, action);
}