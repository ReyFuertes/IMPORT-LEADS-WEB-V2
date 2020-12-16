import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getContractTemplatesSelector = createSelector(
  selectContractModuleState,
  state => Object.values(state?.contractTemplate?.entities)
);