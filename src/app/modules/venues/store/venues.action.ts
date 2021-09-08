import { IVenue } from './../venues.models';
import { createAction, props } from '@ngrx/store';

export enum VenueActionTypes {
  deleteVenueAction = '[Venue] Delete',
  deleteVenueSuccessAction = '[Venue] Delete (success)',
  addVenueAction = '[Venue] Add',
  addVenueSuccessAction = '[Venue] Add (success)',
  updateVenueAction = '[Venue] Update',
  updateVenueSuccessAction = '[Venue] Update (success)',
  loadVenuesAction = '[Venue] Load',
  loadVenuesSuccessAction = '[Venue] Load (success)',
  uploadVenueImageAction = '[Venue] Upload',
}
export const uploadVenueImageAction = createAction(
  VenueActionTypes.uploadVenueImageAction,
  props<{ file: any }>()
);
export const deleteVenueAction = createAction(
  VenueActionTypes.deleteVenueAction,
  props<{ id: string }>()
);
export const deleteVenueSuccessAction = createAction(
  VenueActionTypes.deleteVenueSuccessAction,
  props<{ deleted: IVenue }>()
);
export const updateVenueAction = createAction(
  VenueActionTypes.updateVenueAction,
  props<{ item: IVenue }>()
);
export const updateVenueSuccessAction = createAction(
  VenueActionTypes.updateVenueSuccessAction,
  props<{ updated: IVenue }>()
);
export const addVenueAction = createAction(
  VenueActionTypes.addVenueAction,
  props<{ item: IVenue }>()
);
export const addVenueSuccessAction = createAction(
  VenueActionTypes.addVenueSuccessAction,
  props<{ created: IVenue }>()
);
export const loadVenuesAction = createAction(
  VenueActionTypes.loadVenuesAction,
  props<{ param?: string }>()
);
export const loadVenuesSuccessAction = createAction(
  VenueActionTypes.loadVenuesSuccessAction,
  props<{ items: IVenue[] }>()
);
