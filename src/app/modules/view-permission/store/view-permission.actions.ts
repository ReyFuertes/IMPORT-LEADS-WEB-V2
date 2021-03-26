import { createAction, props } from '@ngrx/store';
import { IUserView } from '../view-permission.model';

export enum UserViewActionTypes {
  getUserPermissionAction = '[User View] get user permission',
  getUserPermissionSuccessAction = '[User View] get user permission (success)',
  saveUserPermissionAction = '[User View] save user permission',
  saveUserPermissionSuccessAction = '[User View] save user permission (success)'
}

export const getUserPermissionAction = createAction(
  UserViewActionTypes.getUserPermissionAction,
  props<{ id: any }>()
);
export const getUserPermissionSuccessAction = createAction(
  UserViewActionTypes.getUserPermissionSuccessAction,
  props<{ response: any[] }>()
);
export const saveUserPermissionAction = createAction(
  UserViewActionTypes.saveUserPermissionAction,
  props<{ payload: IUserView }>()
);
export const saveUserPermissionSuccessAction = createAction(
  UserViewActionTypes.saveUserPermissionSuccessAction,
  props<{ response: any[] }>()
);