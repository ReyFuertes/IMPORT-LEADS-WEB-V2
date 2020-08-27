import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.initApp;
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
