import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContractCategory from '../reducers/contract-category.reducer'

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getContractCategorySelector = createSelector(
  selectContractModuleState,
  fromContractCategory.getContractCategory
);
