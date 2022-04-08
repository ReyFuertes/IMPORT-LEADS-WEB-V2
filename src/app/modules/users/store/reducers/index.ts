import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import { UserProfileReducer, UserProfileState } from './user-profile.reducer';
import { UserSettingReducer, UserSettingState } from './user-setting.reducer';
import { UserReducer, UserState } from './user.reducer';

export interface UserModuleState {
  user: UserState,
  userProfile: UserProfileState,
  userSetting: UserSettingState
}
export const reducers: ActionReducerMap<UserModuleState> = {
  user: UserReducer,
  userProfile: UserProfileReducer,
  userSetting: UserSettingReducer
};
export interface AppState extends fromRoot.AppState {
  usersModule: UserModuleState;
}


