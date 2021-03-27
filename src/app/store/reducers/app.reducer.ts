import { createReducer, on, Action } from "@ngrx/store";
import { initAppSuccessAction, loadAccessSuccessAction, loadAllRolesSuccessAction, getUserAccessSuccessAction, getUserRoleSuccessAction, loadAppUserProfileSuccessAction, loadUserListSuccessAction, loadUserClientsSuccessAction } from '../actions/app.action';
import { loginSuccessAction, logoutSuccessAction, isLoggingInAction, loginFailedAction } from 'src/app/modules/auth/store/auth.action';
import { IAccess } from 'src/app/models/user.model';
import { IRole, IUser } from 'src/app/modules/user-management/user-mgmt.model';
import { IUserProfile } from "src/app/modules/users/users.models";
import { updateProfileSuccessAction } from "src/app/modules/users/store/actions/user-profile.actions";
export interface InitAppState {
  token?: string,
  isLoggedIn?: boolean,
  isLoggingIn?: boolean,
  isLoginFailed?: boolean,
  access?: IAccess[],
  roles?: IRole[],
  userAccess?: string[],
  userRoles?: string[],
  detail?: IUserProfile,
  userList?: IUser[]
  userClients?: IUser[]
}
export const initialState: InitAppState = {
  token: null,
  isLoggedIn: null,
  isLoggingIn: null,
  isLoginFailed: null,
  access: null,
  roles: null,
  userAccess: null,
  userRoles: null,
  detail: null,
  userList: null,
  userClients: null
};
const initAppReducer = createReducer(
  initialState,
  on(loadUserClientsSuccessAction, (state, action) => {
    return Object.assign({}, state, { userClients: action.response });
  }),
  on(loadUserListSuccessAction, (state, action) => {
    return Object.assign({}, state, { userList: action.response });
  }),
  on(updateProfileSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action.response });
  }),
  on(loadAppUserProfileSuccessAction, (state, action) => {
    return Object.assign({}, state, { detail: action.detail });
  }),
  on(getUserRoleSuccessAction, (state, action) => {
    return Object.assign({}, state, { userRoles: action.response });
  }),
  on(getUserAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { userAccess: action.response });
  }),
  on(loadAllRolesSuccessAction, (state, action) => {
    return Object.assign({}, state, { roles: action.roles });
  }),
  on(loadAccessSuccessAction, (state, action) => {
    return Object.assign({}, state, { access: action.response })
  }),
  on(loginFailedAction, (state) => {
    return Object.assign({}, state, { isLoginFailed: true })
  }),
  on(isLoggingInAction, (state) => {
    return Object.assign({}, state, { isLoggingIn: true })
  }),
  on(logoutSuccessAction, (state) => {
    state = undefined;
    return Object.assign({}, state)
  }),
  on(loginSuccessAction, (state, action) => {
    return Object.assign({}, state, { token: action.accessToken, isLoggedIn: true, isLoggingIn: null, isLoginFailed: null })
  }),
  on(initAppSuccessAction, (state, action) => {
    let isLoggedIn: boolean = false;
    let token = action.token || null;
    if (token) isLoggedIn = true
    else {
      isLoggedIn = false;
    }

    return Object.assign({}, state, { token, isLoggedIn })
  }),
);
export function InitAppReducer(state: InitAppState, action: Action) {
  return initAppReducer(state, action);
}