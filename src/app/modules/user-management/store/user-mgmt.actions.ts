import { createAction, props } from '@ngrx/store';
import { IUserMgmt } from '../user-mgmt.model';

export enum UserMgmtActionTypes {
  loadAllUsersAction = '[User Mgmt] load',
  loadAllUsersSuccessAction = '[User Mgmt] load (success)'
}
export const loadAllUsersAction = createAction(
  UserMgmtActionTypes.loadAllUsersAction
);
export const loadAllUsersSuccessAction = createAction(
  UserMgmtActionTypes.loadAllUsersSuccessAction,
  props<{ users: IUserMgmt[] }>()
);
