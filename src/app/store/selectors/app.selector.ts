import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IRole, IUser } from 'src/app/modules/user-management/user-mgmt.model';
import { sortByDesc } from 'src/app/shared/util/sort';

export const selectedState = (state: AppState) => state.initApp;
export const getUserLangSelector = createSelector(
  selectedState,
  state => state?.language
)
export const getUserClientsSelector = createSelector(
  selectedState,
  state => state?.userClients?.map((uc: IUser) => {
    return {
      label: `${uc?.user_profile?.firstname} ${uc?.user_profile?.lastname}`,
      value: uc.id
    };
  })
);
export const getUserListSelector = createSelector(
  selectedState,
  state => state?.userList
);
export const getAppUserProfileSelector = createSelector(
  selectedState,
  state => state?.detail
);
export const getUserRolesSelector = createSelector(
  selectedState,
  state => state?.userRoles
)
export const getUserAccessSelector = createSelector(
  selectedState,
  state => state?.userAccess
)
export const getAllRolesSelector = createSelector(
  selectedState,
  state => {
    const fmtRoles = state?.roles;
    const roles = fmtRoles?.map((u: IRole) => {
      return {
        label: u.role_name,
        value: String(u.id)
      };
    }) || [];
    return roles;
  }
);
export const getAllAccessSelector = createSelector(
  selectedState,
  state => state?.access?.map(a => {
    const children = state?.access?.filter(c => {
      return c.parent && c?.parent?.id === a.id;
    }) || null;

    return {
      label: a.access_name,
      value: String(a.id),
      parent: a.parent,
      children,
      access_route: a.access_route
    }
  }).sort((a, b) => sortByDesc(a, b, 'position'))
);
export const getIsLoginFailedSelector = createSelector(
  selectedState,
  state => state?.isLoginFailed
);
export const getIsLoggingInSelector = createSelector(
  selectedState,
  state => state?.isLoggingIn
);
export const getIsLoggedInSelector = createSelector(
  selectedState,
  state => state?.isLoggedIn
);
export const getAuthTokenSelector = createSelector(
  selectedState,
  state => state?.token
);
