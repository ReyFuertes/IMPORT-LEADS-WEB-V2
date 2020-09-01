import { createReducer, on, Action } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUserMgmt, IUserAccess, IRole } from '../user-mgmt.model';
import { loadAllUsersSuccessAction, signUpUserAction, signUpUserSuccessAction } from './user-mgmt.actions';
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
  on(signUpUserSuccessAction, (state) => {
    return Object.assign({}, state, { creatingUser: null });
  }),
  on(signUpUserAction, (state) => {
    return Object.assign({}, state, { creatingUser: true });
  }),
  on(loadAllUsersSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.users, state) });
  }),
);
export function UserMgmtReducer(state: UserMgmtState, action: Action) {
  return userMgmtReducer(state, action);
}