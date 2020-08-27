import { createReducer, on, Action } from "@ngrx/store";
import { initAppSuccessAction } from '../actions/app.action';
import { loginSuccessAction } from 'src/app/modules/auth/store/auth.action';

export interface InitAppState {
  token?: string,
  isLoggedIn?: boolean
}
export const initialState: InitAppState = {
  token: null,
  isLoggedIn: null
};
const initAppReducer = createReducer(
  initialState,
  on(loginSuccessAction, (state, action) => {
    return Object.assign({}, state, { token: action.accessToken, isLoggedIn: true })
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