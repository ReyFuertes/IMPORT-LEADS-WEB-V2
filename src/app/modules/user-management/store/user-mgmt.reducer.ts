import { createReducer, on, Action } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUserMgmt, IUserAccess } from '../user-mgmt.model';
import { loadAllUsersSuccessAction, saveUserAccessSuccessAction } from './user-mgmt.actions';
import * as _ from 'lodash';
import { IAccess } from 'src/app/models/user.model';
export interface UserMgmtState extends EntityState<IUserMgmt> {
  access?: IUserAccess[]
}
export const adapter: EntityAdapter<IUserMgmt> = createEntityAdapter<IUserMgmt>({});
export const initialState: UserMgmtState = adapter.getInitialState({
  access: null
});

const userMgmtReducer = createReducer(
  initialState,
  on(loadAllUsersSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.users, state) })
  }),
);
export function UserMgmtReducer(state: UserMgmtState, action: Action) {
  return userMgmtReducer(state, action);
}