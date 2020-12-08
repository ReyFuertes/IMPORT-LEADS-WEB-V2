import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getAllContractCategoriesSelector = createSelector(
  selectContractModuleState,
  state => state?.contractCategory?.contractCategories
);

export const getContractCategorySelector = createSelector(
  selectContractModuleState,
  state => Object.values(state?.contractCategory?.entities)
);
export const getCategoryTermsSelector = createSelector(
  selectContractModuleState,
  state => state?.contractCategory?.selTermsForChecklist
);
