import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { sortByDesc } from 'src/app/shared/util/sort';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getAllSavedChecklistSelector = createSelector(
  selectContractModuleState,
  state =>  Object.values(state?.savedChecklist?.entities).sort((a, b) => sortByDesc(a, b, 'created_at')) || []
);
