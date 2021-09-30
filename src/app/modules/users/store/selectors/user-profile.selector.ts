import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModuleState } from '../reducers';

export const selectUserProfileModuleState = createFeatureSelector<UserModuleState>('usersModule');
export const getUserProfileSelector = createSelector(
  selectUserProfileModuleState,
  state => state?.userProfile?.detail
);