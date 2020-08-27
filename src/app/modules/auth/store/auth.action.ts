import { createAction, props } from '@ngrx/store';
import { ILoginCred } from '../auth.model';

export enum LoginActionTypes {
  loginAction = '[Auth] login',
  loginSuccessAction = '[Auth] login (success)',
  logoutAction = '[Auth] logout',
}
export const logoutAction = createAction(
  LoginActionTypes.logoutAction,
);
export const loginAction = createAction(
  LoginActionTypes.loginAction,
  props<{ cred: ILoginCred }>()
);
export const loginSuccessAction = createAction(
  LoginActionTypes.loginSuccessAction,
  props<{ accessToken: any }>()
);
