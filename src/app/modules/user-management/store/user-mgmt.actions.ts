import { createAction, props } from '@ngrx/store';
import { IUserMgmt, IUserAccess } from '../user-mgmt.model';

export enum UserMgmtActionTypes {
  loadAllUsersAction = '[User Mgmt] load',
  loadAllUsersSuccessAction = '[User Mgmt] load (success)',
  saveUserAccessAction = '[User Mgmt] save user access',
  saveUserAccessSuccessAction = '[User Mgmt] save user access (success)'
}
export const saveUserAccessAction = createAction(
  UserMgmtActionTypes.saveUserAccessAction,
  props<{ payload: IUserAccess }>()
);
export const saveUserAccessSuccessAction = createAction(
  UserMgmtActionTypes.saveUserAccessSuccessAction,
  props<{ response: IUserAccess }>()
);
export const loadAllUsersAction = createAction(
  UserMgmtActionTypes.loadAllUsersAction
);
export const loadAllUsersSuccessAction = createAction(
  UserMgmtActionTypes.loadAllUsersSuccessAction,
  props<{ users: IUserMgmt[] }>()
);
