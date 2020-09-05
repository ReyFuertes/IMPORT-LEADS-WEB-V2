import { createAction, props } from '@ngrx/store';
import { IAccess } from 'src/app/models/user.model';
import { IRole, IUserAccess } from 'src/app/modules/user-management/user-mgmt.model';

export enum AppActionTypes {
  initAppAction = '[App] init',
  initAppSuccessAction = '[App] init (success)',
  loadAccessAction = '[App] load user access',
  loadAccessSuccessAction = '[App] load user access (success)',
  loadAllRolesAction = '[User Mgmt] load roles',
  loadAllRolesSuccessAction = '[User Mgmt] load roles (success)',
  getUserAccessAction = '[User] user access',
  getUserAccessSuccessAction = '[User] user access (success)'
}
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