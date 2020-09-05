import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IRole } from 'src/app/modules/user-management/user-mgmt.model';

export const selectedState = (state: AppState) => state.initApp;
export const getUserAccessSelector = createSelector(
  selectedState,
  state => {
    return state && state.userAccess
  }
)
export const getAllRolesSelector = createSelector(
  selectedState,
  state => {
    const fmtRoles = state && state.roles;
    const roles = fmtRoles && fmtRoles.map((u: IRole) => {
      return {
        label: u.role_name,
        value: String(u.id)
      };
    }) || [];
    return roles;
  }
);
export const getAccessSelector = createSelector(
  selectedState,
  state => state
    && state.access
    && state.access.map(a => {
      const children = state.access.filter(c => {
        return c.parent && c.parent.id === a.id;
      }) || null;

      return {
        label: a.access_name,
        value: String(a.id),
        parent: a.parent,
        children,
        user_route: a.user_route
      }
    })
);
export const getIsLoginFailedSelector = createSelector(
  selectedState,
  state => state.isLoginFailed
);
export const getIsLoggingInSelector = createSelector(
  selectedState,
  state => state.isLoggingIn
);
export const getIsLoggedInSelector = createSelector(
  selectedState,
  state => state.isLoggedIn
);
export const getAuthTokenSelector = createSelector(
  selectedState,
  state => state.token
);
