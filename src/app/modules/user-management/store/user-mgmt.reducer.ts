import { createReducer, on, Action } from "@ngrx/store";
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { IUserMgmt } from '../user-mgmt.model';
import { loadAllUsersSuccessAction } from './user-mgmt.actions';

export interface UserMgmtState extends EntityState<IUserMgmt> {
}
export const adapter: EntityAdapter<IUserMgmt> = createEntityAdapter<IUserMgmt>({});
export const initialState: UserMgmtState = adapter.getInitialState({
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