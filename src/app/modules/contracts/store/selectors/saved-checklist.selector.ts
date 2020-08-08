import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getAllSavedChecklistSelector = createSelector(
  selectContractModuleState,
  state => Object.values(state.SavedChecklist.entities) || []
);
