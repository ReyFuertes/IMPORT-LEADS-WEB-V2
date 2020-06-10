import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContractChecklist from '../reducers/contract-checklist.reducer'

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getContractChecklistSelector = createSelector(
  selectContractModuleState, state => state.checkList
);
