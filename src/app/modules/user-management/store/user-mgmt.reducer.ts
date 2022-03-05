import { createReducer, on, Action } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUserMgmt, IUserAccess, IRole } from '../user-mgmt.model';
import { loadAllUsersSuccessAction, signUpUserAction, signUpUserSuccessAction, deleteUserSuccessAction, saveUserAccessSuccessAction, addUserSuccessAction } from './user-mgmt.actions';
import * as _ from 'lodash';
export interface UserMgmtState extends EntityState<IUserMgmt> {
  access?: IUserAccess[],
  creatingUser?: boolean
}
export const adapter: EntityAdapter<IUserMgmt> = createEntityAdapter<IUserMgmt>({});
export const initialState: UserMgmtState = adapter.getInitialState({
  access: null,
  creatingUser: null
});
const userMgmtReducer = createReducer(
  initialState,
  on(deleteUserSuccessAction, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(signUpUserSuccessAction, (state) => {
    return Object.assign({}, state, { creatingUser: null });
  }),
  on(signUpUserSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.response, state) });
  }),
  on(signUpUserAction, (state) => {
    return Object.assign({}, state, { creatingUser: true });
  }),
  on(loadAllUsersSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.users, state) });
  }),
);
export function UserMgmtReducer(state: UserMgmtState, action: Action) {
  return userMgmtReducer(state, action);
}