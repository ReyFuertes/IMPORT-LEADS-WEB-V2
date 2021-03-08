import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import { UserProfileReducer, UserProfileState } from './user-profile.reducer';
import { UserReducer, UserState } from './user.reducer';

export interface UserModuleState {
  user: UserState,
  userProfile: UserProfileState
}
export const reducers: ActionReducerMap<UserModuleState> = {
  user: UserReducer,
  userProfile: UserProfileReducer
};
export interface AppState extends fromRoot.AppState {
  contractsModule: UserModuleState;
}


