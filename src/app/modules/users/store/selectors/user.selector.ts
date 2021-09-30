import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModuleState } from '../reducers';

export const selectUserModuleState = createFeatureSelector<UserModuleState>('usersModule');
export const getChangePasswordStatusSelector = createSelector(
  selectUserModuleState,
  state => state?.user?.changePasswordStatus
);