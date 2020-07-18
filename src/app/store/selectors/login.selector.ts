import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.login;
export const getIsLoggingSelector = createSelector(
  selectedState,
  state => state.isLoggingIn
);
export const getHasLoggedInSelector = createSelector(
  selectedState,
  state => state.hasLoggedIn
);
