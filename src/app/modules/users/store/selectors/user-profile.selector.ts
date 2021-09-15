import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<UserModuleState>('usersModule');
export const getUserProfileSelector = createSelector(
  selectContractModuleState,
  state => state?.userProfile?.detail
);
export const getChangePasswordStatusSelector = createSelector(
  selectContractModuleState,
  state => state?.user?.errorStatus
);