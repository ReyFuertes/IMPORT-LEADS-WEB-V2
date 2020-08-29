import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { UserModuleState } from '../reducers';

export const selectContractModuleState = createFeatureSelector<UserModuleState>('usersModule');
export const getUserProfileSelector = createSelector(
  selectContractModuleState,
  state => state
    && state.userProfile
    && state.userProfile.detail
);