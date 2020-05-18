import { TagsState, TagsReducer } from './../modules/tags/store/reducers/tags.reducer';
import { ProductsState, ProductsReducer } from './../modules/products/store/products.reducer';
import { NotificationState } from './notification.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { NotificationReducer } from './notification.reducer';

export interface AppState {
  notification?: NotificationState,
  venues?: VenuesState,
  products?: ProductsState,
  tags?: TagsState
}
export const reducers: ActionReducerMap<AppState> = {
  notification: NotificationReducer,
  venues: VenuesReducer,
  products: ProductsReducer,
  tags: TagsReducer
};
