import { createReducer, on, Action } from "@ngrx/store";
import { initAppSuccessAction, loadAccessSuccessAction } from '../actions/app.action';
import { loginSuccessAction, logoutAction, logoutSuccessAction, isLoggingInAction, loginFailedAction } from 'src/app/modules/auth/store/auth.action';
import { IAccess } from 'src/app/models/user.model';
export interface InitAppState {
  token?: string,
  isLoggedIn?: boolean,
  isLoggingIn?: boolean,
  isLoginFailed?: boolean,
  access?: IAccess[]
}
export const initialState: InitAppState = {
  token: null,
  isLoggedIn: null,
  isLoggingIn: null,
  isLoginFailed: null,
  access: null
};
const initAppReducer = createReducer(
  initialState,
  on(loadAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response })
  }),
  on(loginFailedAction, (state) => {
    return Object.assign({}, state, { isLoginFailed: true })
  }),
  on(isLoggingInAction, (state) => {
    return Object.assign({}, state, { isLoggingIn: true })
  }),
  on(logoutSuccessAction, (state) => {
    return Object.assign({}, state, { token: null, isLoggedIn: null, isLoggingIn: null })
  }),
  on(loginSuccessAction, (state, action) => {
    return Object.assign({}, state, { token: action.accessToken, isLoggedIn: true, isLoggingIn: null, isLoginFailed: null })
  }),
  on(initAppSuccessAction, (state, action) => {
    let isLoggedIn: boolean = false;
    let token = action.token || null;
    if (token) isLoggedIn = true
    else {
      isLoggedIn = false;
    }

    return Object.assign({}, state, { token, isLoggedIn })
  }),
);
export function InitAppReducer(state: InitAppState, action: Action) {
  return initAppReducer(state, action);
}