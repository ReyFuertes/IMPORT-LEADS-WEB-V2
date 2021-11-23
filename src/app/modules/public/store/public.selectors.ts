import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectedState = (state: AppState) => state.public;
export const getPublicEmailTokenSelector = createSelector(
  selectedState,
  state => state?.emailToken
);