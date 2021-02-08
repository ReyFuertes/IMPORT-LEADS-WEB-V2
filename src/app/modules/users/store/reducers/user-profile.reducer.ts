import { createReducer, on, Action } from "@ngrx/store";
import { IUserProfile } from '../../users.models';
import { loadUserProfileSuccessAction, updateProfileSuccessAction } from '../actions/user-profile.actions';
export interface UserProfileState {
  detail?: IUserProfile
}
export const initialState: UserProfileState = {
  detail: null
};
const userProfileReducer = createReducer(
  initialState,
  on(updateProfileSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action.response });
  }),
  on(loadUserProfileSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action.response });
  }),
);
export function UserProfileReducer(state: UserProfileState, action: Action) {
  return userProfileReducer(state, action);
}