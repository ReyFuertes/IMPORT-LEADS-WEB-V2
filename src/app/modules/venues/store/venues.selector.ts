import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromVenues from './venues.reducer'

export const selectedState = (state: AppState) => state.venues;
export const getVenuesSelector = createSelector(
  selectedState,
  fromVenues.getVenues
);
