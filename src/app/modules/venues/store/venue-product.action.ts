import { IVenue, IvenueProduct } from './../venues.models';
import { createAction, props } from '@ngrx/store';

export enum VenueProductActionTypes {
  removeVenueProduct = '[Venue Product] Remove',
  removeVenueProductSuccess = '[Venue Product] Remove (success)',
}
export const removeVenueProduct = createAction(
  VenueProductActionTypes.removeVenueProduct,
  props<{ item: IvenueProduct }>()
);
export const removeVenueProductSuccess = createAction(
  VenueProductActionTypes.removeVenueProductSuccess,
  props<{ removed: IvenueProduct }>()
);
