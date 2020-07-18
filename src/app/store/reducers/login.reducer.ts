import { ILoginUser } from './../../modules/auth/auth.model';
import { loginSuccess, isLoggingInAction } from './../actions/login.action';
import { createReducer, on, Action } from "@ngrx/store";

export interface LoginState {
  loginUser?: ILoginUser,
  isLoggingIn?: boolean,
  hasLoggedIn?: boolean
}

export const initialState: LoginState = {
  loginUser: null,
  isLoggingIn: null,
  hasLoggedIn: null
};
const reducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return Object.assign({}, state, { isLoggingIn: false, hasLoggedIn: true, loginUser: action.response })
  }),
  on(isLoggingInAction, (state, action) => {
    return Object.assign({}, state, { isLoggingIn: true, hasLoggedIn: false })
  })
)
export function LoginReducer(state: LoginState, action: Action) {
  return reducer(state, action);
}
