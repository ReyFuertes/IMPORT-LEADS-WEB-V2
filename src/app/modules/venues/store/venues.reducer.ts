import { removeVenueProductSuccess } from './venue-product.action';
import { IVenue } from './../venues.models';
import { loadVenuesAction, loadVenuesSuccessAction, addVenueSuccessAction, deleteVenueSuccessAction, updateVenueSuccessAction } from './venues.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface VenuesState extends EntityState<IVenue> {
  imagesToUpload?: any
}
export const adapter: EntityAdapter<IVenue> = createEntityAdapter<IVenue>({});
export const initialState: VenuesState = adapter.getInitialState({
  imagesToUpload: null
});
const venuesReducer = createReducer(
  initialState,
  on(updateVenueSuccessAction, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(deleteVenueSuccessAction, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addVenueSuccessAction, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(loadVenuesAction, (state) => {
    return ({ ...adapter.removeAll(state) })
  }),
  on(loadVenuesSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function VenuesReducer(state: VenuesState, action: Action) {
  return venuesReducer(state, action);
}

export const getImageToUpload= (state: VenuesState) => {
  return state && state.imagesToUpload;
};

