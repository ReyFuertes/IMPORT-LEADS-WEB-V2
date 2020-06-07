import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getContractChecklistSelector = createSelector(
  selectContractModuleState,
  (state: ContractModuleState) => state.contractChecklist.entities || []
);
