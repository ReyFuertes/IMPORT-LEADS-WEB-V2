import { IVenue } from './../venues.models';
import { createAction, props } from '@ngrx/store';

export enum VenueActionTypes {
  AddVenue = '[Venue] Add',
  AddVenueSuccess = '[Venue] Add (success)',
  LoadVenues = '[Venue] Load',
  LoadVenuesSuccess = '[Venue] Load (success)',
}
export const AddVenue = createAction(
  VenueActionTypes.AddVenue,
  props<{ item: IVenue }>()
);
export const AddVenueSuccess = createAction(
  VenueActionTypes.AddVenueSuccess,
  props<{ created: IVenue }>()
);
export const loadVenues = createAction(
  VenueActionTypes.LoadVenues
);
export const loadVenuesSuccess = createAction(
  VenueActionTypes.LoadVenuesSuccess,
  props<{ items: IVenue[] }>()
);
