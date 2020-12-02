import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContractCategory from '../reducers/contract-category.reducer'

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getContractCategorySelector = createSelector(
  selectContractModuleState,
  state => Object.values(state?.contractCategory?.entities)
);
export const getCategoryTermsSelector = createSelector(
  selectContractModuleState,
  state => state?.contractCategory?.selTermsForChecklist
);
