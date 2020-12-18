import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCategoryModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getCategoryTemplatesSelector = createSelector(
  selectCategoryModuleState,
  state => Object.values(state?.categoryTemplate?.entities)
);