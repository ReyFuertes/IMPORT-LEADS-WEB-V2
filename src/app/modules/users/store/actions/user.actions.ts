import { createAction, props } from '@ngrx/store';
import { IUserProfile } from '../../users.models';

export enum UserActionTypes {
  changePasswordAction = '[User Profile] change password',
  changePasswordSuccessAction = '[User Profile] change password (success)',
  changeUserPasswordFailedAction = '[User Profile] change password (failed)',
}
export const changeUserPasswordAction = createAction(
  UserActionTypes.changePasswordAction,
  props<{ payload: any }>()
);
export const changeUserPasswordSuccessAction = createAction(
  UserActionTypes.changePasswordSuccessAction,
  props<{ response: any }>()
);
export const changeUserPasswordFailedAction = createAction(
  UserActionTypes.changeUserPasswordFailedAction,
  props<{ status: any }>()
);