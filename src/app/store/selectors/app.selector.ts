import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.initApp;
export const getIsLoggedInSelector = createSelector(
  selectedState,
  state => state.isLoggedIn
);
export const getAuthTokenSelector = createSelector(
  selectedState,
  state => state.token
);
