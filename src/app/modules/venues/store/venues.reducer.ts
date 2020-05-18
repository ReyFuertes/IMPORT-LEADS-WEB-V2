import { IVenue } from './../venues.models';
import { loadVenues, loadVenuesSuccess } from './venues.action';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface VenuesState extends EntityState<IVenue> {
}
export const venuesAdapter: EntityAdapter<IVenue> = createEntityAdapter<IVenue>({});
export const initialState: VenuesState = venuesAdapter.getInitialState({

});
const venuesReducer = createReducer(
  initialState,
  on(loadVenues, (state) => {
    return ({ ...venuesAdapter.removeAll(state) })
  }),
  on(loadVenuesSuccess, (state, action) => {
    return ({ ...venuesAdapter.addAll(action.items, state) })
  })
);
export function VenuesReducer(state: VenuesState, action: Action) {
  return venuesReducer(state, action);
}
export const getVenues = (state: VenuesState) => {
  return state && state.entities ? Object.values(state.entities) : null;
};


