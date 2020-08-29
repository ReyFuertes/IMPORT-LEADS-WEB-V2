import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import { UserProfileReducer, UserProfileState } from './user-profile.reducer';

export interface UserModuleState {
  userProfile: UserProfileState
}
export const reducers: ActionReducerMap<UserModuleState> = {
  userProfile: UserProfileReducer
};
export interface AppState extends fromRoot.AppState {
  contractsModule: UserModuleState;
}


