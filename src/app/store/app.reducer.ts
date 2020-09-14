import { TagsState, TagsReducer } from './../modules/tags/store/reducers/tags.reducer';
import { ContractProductsState, ProductsReducer } from './../modules/products/store/products.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';
import { AuthState, AuthReducer } from '../modules/auth/store/auth.reducer';
import { InitAppState, InitAppReducer } from './reducers/app.reducer';
import { UserMgmtState, UserMgmtReducer } from '../modules/user-management/store/user-mgmt.reducer';
export interface AppState {
  initApp: InitAppState,
  notification?: NotificationState,
  venues?: VenuesState,
  products?: ContractProductsState,
  tags?: TagsState,
  auth: AuthState,
  userMgmt?: UserMgmtState
}
export const reducers: ActionReducerMap<AppState> = {
  initApp: InitAppReducer,
  notification: NotificationReducer,
  venues: VenuesReducer,
  products: ProductsReducer,
  tags: TagsReducer,
  auth: AuthReducer,
  userMgmt: UserMgmtReducer
};
