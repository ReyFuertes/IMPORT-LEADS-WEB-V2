import { IVenue } from './../venues.models';
import { createAction, props } from '@ngrx/store';

export enum VenueActionTypes {
  LoadVenues = '[Venue] Load',
  LoadVenuesSuccess = '[Venue] Load (success)',
}
export const loadVenues = createAction(
  VenueActionTypes.LoadVenues
);
export const loadVenuesSuccess = createAction(
  VenueActionTypes.LoadVenuesSuccess,
  props<{ items: IVenue[] }>()
);
