import { IVenue } from './../venues.models';
import { createAction, props } from '@ngrx/store';

export enum VenueActionTypes {
  deleteVenue = '[Venue] Delete',
  deleteVenueSuccess = '[Venue] Delete (success)',
  addVenue = '[Venue] Add',
  addVenueSuccess = '[Venue] Add (success)',
  loadVenues = '[Venue] Load',
  loadVenuesSuccess = '[Venue] Load (success)',
}
export const deleteVenue = createAction(
  VenueActionTypes.deleteVenue,
  props<{ id: string }>()
);
export const deleteVenueSuccess = createAction(
  VenueActionTypes.deleteVenueSuccess,
  props<{ deleted: IVenue }>()
);
export const addVenue = createAction(
  VenueActionTypes.addVenue,
  props<{ item: IVenue }>()
);
export const addVenueSuccess = createAction(
  VenueActionTypes.addVenueSuccess,
  props<{ created: IVenue }>()
);
export const loadVenues = createAction(
  VenueActionTypes.loadVenues
);
export const loadVenuesSuccess = createAction(
  VenueActionTypes.loadVenuesSuccess,
  props<{ items: IVenue[] }>()
);
