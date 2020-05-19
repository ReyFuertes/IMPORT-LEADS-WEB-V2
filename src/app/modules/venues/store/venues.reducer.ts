import { removeVenueProductSuccess } from './venue-product.action';
import { IVenue } from './../venues.models';
import { loadVenues, loadVenuesSuccess, addVenueSuccess, deleteVenueSuccess, updateVenueSuccess } from './venues.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface VenuesState extends EntityState<IVenue> {
}
export const adapter: EntityAdapter<IVenue> = createEntityAdapter<IVenue>({});
export const initialState: VenuesState = adapter.getInitialState({

});
const venuesReducer = createReducer(
  initialState,
  on(updateVenueSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(deleteVenueSuccess, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addVenueSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(loadVenues, (state) => {
    return ({ ...adapter.removeAll(state) })
  }),
  on(loadVenuesSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function VenuesReducer(state: VenuesState, action: Action) {
  return venuesReducer(state, action);
}
export const getVenues = (state: VenuesState) => {
  return state && state.entities ? Object.values(state.entities) : null;
};


