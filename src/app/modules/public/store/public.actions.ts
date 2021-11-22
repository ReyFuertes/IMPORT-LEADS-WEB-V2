import { createAction, props } from '@ngrx/store';

export enum PublicActionTypes {
  isUserExistForChangePasswordAction = '[Public] user exist for password change',
  isUserExistForChangePasswordSuccessAction = '[Public] user exist for password change (success)',
}
export const isUserExistForChangePasswordAction = createAction(
  PublicActionTypes.isUserExistForChangePasswordAction,
  props<{ id: string }>()
);
export const isUserExistForChangePasswordSuccessAction = createAction(
  PublicActionTypes.isUserExistForChangePasswordSuccessAction,
  props<{ response: any }>()
);
