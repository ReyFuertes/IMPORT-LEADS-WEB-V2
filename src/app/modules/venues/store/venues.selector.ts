import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromVenues from './venues.reducer'

export const selectedState = (state: AppState) => state.venues;
export const getVenuesSelector = createSelector(
  selectedState,
  state => Object.values(state.entities)
);
export const getImageToUploadSelector = createSelector(
  selectedState,
  fromVenues.getImageToUpload
);
