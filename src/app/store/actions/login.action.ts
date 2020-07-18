import { createAction, props } from '@ngrx/store';
import { ILoginUser } from 'src/app/modules/auth/auth.model';

export enum ApiLoginActionTypes {
  login = '[Login] API login',
  loginSuccess = '[Login] API login (success)',
  loginFailed = '[Login] API login (failed)',
  isLoggingInAction = '[Login] API Set login',
}
export const login = createAction(
  ApiLoginActionTypes.login,
  props<{ payload: ILoginUser }>()
);
export const loginSuccess = createAction(
  ApiLoginActionTypes.loginSuccess,
  props<{ response: ILoginUser }>()
);
export const isLoggingInAction = createAction(
  ApiLoginActionTypes.isLoggingInAction,
  props<{ payload: boolean }>()
);
export const loginFailed = createAction(
  ApiLoginActionTypes.loginFailed,
  props<{ error: any }>()
);
