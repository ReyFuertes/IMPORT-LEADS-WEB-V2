import { createAction, props } from '@ngrx/store';

export enum PublicActionTypes {
  isUserExistForChangePasswordAction = '[Public] user exist for password change',
  isUserExistForChangePasswordSuccessAction = '[Public] user exist for password change (success)',
  ChangePublicUserPasswordAction = '[Public] change user password',
  ChangePublicUserPasswordSuccessAction = '[Public] change user password (success)',
}
export const ChangePublicUserPasswordAction = createAction(
  PublicActionTypes.ChangePublicUserPasswordAction,
  props<{ payload: any }>()
);
export const ChangePublicUserPasswordSuccessAction = createAction(
  PublicActionTypes.ChangePublicUserPasswordSuccessAction,
  props<{ response: any }>()
);
export const isUserExistForChangePasswordAction = createAction(
  PublicActionTypes.isUserExistForChangePasswordAction,
  props<{ id: string }>()
);
export const isUserExistForChangePasswordSuccessAction = createAction(
  PublicActionTypes.isUserExistForChangePasswordSuccessAction,
  props<{ response: { email: string, token: string } }>()
);
