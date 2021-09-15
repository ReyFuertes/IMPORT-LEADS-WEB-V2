import { createReducer, on, Action } from "@ngrx/store";
import { changeUserPasswordFailedAction, changeUserPasswordSuccessAction } from "../actions/user.actions";
export interface UserState {
  errorStatus?: boolean
}

export const initialState: UserState = {
  errorStatus: null
};

const userReducer = createReducer(
  initialState,
  on(changeUserPasswordFailedAction, (state, action) => {
    return Object.assign({}, state, { errorStatus: action.status });
  }),
);
export function UserReducer(state: UserState, action: Action) {
  return userReducer(state, action);
}