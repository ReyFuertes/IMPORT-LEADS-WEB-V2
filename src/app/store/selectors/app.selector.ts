import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IRole } from 'src/app/modules/user-management/user-mgmt.model';

export const selectedState = (state: AppState) => state.initApp;
export const getAllRolesSelector = createSelector(
  selectedState,
  state => {
    const fmtRoles = state.roles;
    const roles = fmtRoles.map((u: IRole) => {
      return {
        label: u.role_name,
        value: String(u.id)
      };
    });
    return roles;
  }
);
export const getAccessSelector = createSelector(
  selectedState,
  state => state
    && state.access
    && state.access.map(a => {
      return {
        label: a.access_name,
        value: String(a.id)
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
