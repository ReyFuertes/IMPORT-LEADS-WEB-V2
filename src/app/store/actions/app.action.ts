import { createAction, props } from '@ngrx/store';
import { IAccess } from 'src/app/models/user.model';
import { IRole, IUser, IUserAccess } from 'src/app/modules/user-management/user-mgmt.model';
import { IUserProfile } from 'src/app/modules/users/users.models';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';

export enum AppActionTypes {
  initAppAction = '[App] init',
  initAppSuccessAction = '[App] init (success)',
  loadAccessAction = '[App] load user access',
  loadAccessSuccessAction = '[App] load user access (success)',
  loadAllRolesAction = '[User Mgmt] load roles',
  loadAllRolesSuccessAction = '[User Mgmt] load roles (success)',
  getUserAccessAction = '[User] user access',
  getUserAccessSuccessAction = '[User] user access (success)',
  getUserRoleAction = '[User] user role',
  getUserRoleSuccessAction = '[User] user role (success)',
  loadAppUserProfileAction = '[User] user app profile',
  loadAppUserProfileSuccessAction = '[User] user app profile (success)',
  loadProfileErrorAction = '[User] load profile error',
  loadUserListAction = '[User] user list',
  loadUserListSuccessAction = '[User] user list (success)',
  loadUserClientsAction = '[User] user clients',
  loadUserClientsSuccessAction = '[User] user clients (success)',
  setDefaultLangAction = '[User] set default lang',
}
export const setDefaultLangAction = createAction(
  AppActionTypes.setDefaultLangAction,
  props<{ language: string }>()
);
export const loadUserClientsAction = createAction(
  AppActionTypes.loadUserClientsAction
);
export const loadUserClientsSuccessAction = createAction(
  AppActionTypes.loadUserClientsSuccessAction,
  props<{ response: IUser[] }>()
);
export const loadUserListAction = createAction(
  AppActionTypes.loadUserListAction
);
export const loadUserListSuccessAction = createAction(
  AppActionTypes.loadUserListSuccessAction,
  props<{ response: IUser[] }>()
);
export const loadProfileErrorAction = createAction(
  AppActionTypes.loadProfileErrorAction,
  props<{ error: any }>()
);
export const loadAppUserProfileAction = createAction(
  AppActionTypes.loadAppUserProfileAction,
  props<{ id: string }>()
);
export const loadAppUserProfileSuccessAction = createAction(
  AppActionTypes.loadAppUserProfileSuccessAction,
  props<{ detail: IUserProfile }>()
);
export const getUserRoleAction = createAction(
  AppActionTypes.getUserRoleAction,
  props<{ id: string }>()
);
export const getUserRoleSuccessAction = createAction(
  AppActionTypes.getUserRoleSuccessAction,
  props<{ response: string[] }>()
);
export const getUserAccessAction = createAction(
  AppActionTypes.getUserAccessAction,
  props<{ id: string }>()
);
export const getUserAccessSuccessAction = createAction(
  AppActionTypes.getUserAccessSuccessAction,
  props<{ response: IUserAccess[] }>()
);
export const loadAllRolesAction = createAction(
  AppActionTypes.loadAllRolesAction
);
export const loadAllRolesSuccessAction = createAction(
  AppActionTypes.loadAllRolesSuccessAction,
  props<{ roles: IRole[] }>()
);
export const loadAccessAction = createAction(
  AppActionTypes.loadAccessAction,
);
export const loadAccessSuccessAction = createAction(
  AppActionTypes.loadAccessSuccessAction,
  props<{ response: IAccess[] }>()
);
export const initAppAction = createAction(
  AppActionTypes.initAppAction,
);
export const initAppSuccessAction = createAction(
  AppActionTypes.initAppSuccessAction,
  props<{ token: any }>()
);