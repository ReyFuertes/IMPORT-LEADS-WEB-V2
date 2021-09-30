import { createReducer, on, Action } from "@ngrx/store";
import { changeUserPasswordFailedAction, changeUserPasswordSuccessAction } from "../actions/user.actions";
export interface UserState {
  changePasswordStatus?: boolean
}

export const initialState: UserState = {
  changePasswordStatus: null
};

const userReducer = createReducer(
  initialState,
  on(changeUserPasswordFailedAction, (state, action) => {
    return Object.assign({}, state, { changePasswordStatus:false });
  }),
  on(changeUserPasswordSuccessAction, (state, action) => {
    return Object.assign({}, state, { changePasswordStatus: true });
  }),
  
);
export function UserReducer(state: UserState, action: Action) {
  return userReducer(state, action);
}