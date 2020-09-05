import { createAction, props } from '@ngrx/store';
import { IUserMgmt, IUserAccess, IRole, IUserRole, IUser } from '../user-mgmt.model';

export enum UserMgmtActionTypes {
  loadAllUsersAction = '[User Mgmt] load users',
  loadAllUsersSuccessAction = '[User Mgmt] load users (success)',
  saveUserAccessAction = '[User Mgmt] save user access',
  saveUserAccessSuccessAction = '[User Mgmt] save user access (success)',
  saveUserRoleAction = '[User Mgmt] save user role',
  saveUserRoleSuccessAction = '[User Mgmt] save user role (success)',
  addUserAction = '[User Mgmt] add user',
  addUserSuccessAction = '[User Mgmt] add user (success)',
  signUpUserAction = '[User Mgmt] sign up user',
  signUpUserSuccessAction = '[User Mgmt] sign up user (success)',
  deleteUserAction = '[User Mgmt] delete user',
  deleteUserSuccessAction = '[User Mgmt] delete user (success)',
  saveUserAction = '[User Mgmt] save user',
  saveUserSuccessAction = '[User Mgmt] save user (success)'
}
export const saveUserAction = createAction(
  UserMgmtActionTypes.saveUserAction,
  props<{ payload: IUser }>()
);
export const saveUserSuccessAction = createAction(
  UserMgmtActionTypes.saveUserSuccessAction,
  props<{ response: IUser }>()
);
export const deleteUserAction = createAction(
  UserMgmtActionTypes.deleteUserAction,
  props<{ id: string }>()
);
export const deleteUserSuccessAction = createAction(
  UserMgmtActionTypes.deleteUserSuccessAction,
  props<{ deleted: IUser }>()
);
export const signUpUserAction = createAction(
  UserMgmtActionTypes.signUpUserAction,
  props<{ payload: IUser }>()
);
export const signUpUserSuccessAction = createAction(
  UserMgmtActionTypes.signUpUserSuccessAction,
  props<{ response: IUser }>()
);
export const addUserAction = createAction(
  UserMgmtActionTypes.addUserAction,
  props<{ payload: IUserMgmt }>()
);
export const addUserSuccessAction = createAction(
  UserMgmtActionTypes.addUserSuccessAction,
  props<{ response: IUser[] }>()
);
export const saveUserRoleAction = createAction(
  UserMgmtActionTypes.saveUserRoleAction,
  props<{ payload: IUserRole }>()
);
export const saveUserRoleSuccessAction = createAction(
  UserMgmtActionTypes.saveUserRoleSuccessAction,
  props<{ response: IUserRole }>()
);
export const saveUserAccessAction = createAction(
  UserMgmtActionTypes.saveUserAccessAction,
  props<{ payload: IUserAccess }>()
);
export const saveUserAccessSuccessAction = createAction(
  UserMgmtActionTypes.saveUserAccessSuccessAction,
  props<{ response: IUserAccess[] }>()
);
export const loadAllUsersAction = createAction(
  UserMgmtActionTypes.loadAllUsersAction
);
export const loadAllUsersSuccessAction = createAction(
  UserMgmtActionTypes.loadAllUsersSuccessAction,
  props<{ users: IUserMgmt[] }>()
);
