import { InspectionState, InspectionReducer } from './../modules/inspections/store/inspection.reducer';
import { ContractModuleState } from './../modules/contracts/store/reducers/index';
import { TagsState, TagsReducer } from './../modules/tags/store/reducers/tags.reducer';
import { ContractProductsState, ProductsReducer } from './../modules/products/store/products.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { VenuesState, VenuesReducer } from './../modules/venues/store/venues.reducer';
import { LoginState, LoginReducer } from './reducers/login.reducer';
import { NotificationReducer, NotificationState } from './reducers/notification.reducer';

export interface AppState {
  notification?: NotificationState,
  venues?: VenuesState,
  products?: ContractProductsState,
  tags?: TagsState,
  inspection?: InspectionState,
  login?: LoginState
}
export const reducers: ActionReducerMap<AppState> = {
  notification: NotificationReducer,
  venues: VenuesReducer,
  products: ProductsReducer,
  tags: TagsReducer,
  inspection: InspectionReducer,
  login: LoginReducer
};
