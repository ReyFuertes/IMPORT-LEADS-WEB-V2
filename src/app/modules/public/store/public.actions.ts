import { createAction, props } from '@ngrx/store';

export enum PublicActionTypes {
  isUserExistForChangePasswordAction = '[Public] user exist for password change',
  isUserExistForChangePasswordSuccessAction = '[Public] user exist for password change (success)',
  ValidatePublicUserPasswordAction = '[Public] change user password',
  ValidatePublicUserPasswordSuccessAction = '[Public] change user password (success)',
}
export const ValidatePublicUserPasswordAction = createAction(
  PublicActionTypes.ValidatePublicUserPasswordAction,
  props<{ payload: any }>()
);
export const ValidatePublicUserPasswordSuccessAction = createAction(
  PublicActionTypes.ValidatePublicUserPasswordSuccessAction,
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
