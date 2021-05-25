import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICategory } from '../../contract.model';
import { sortByAsc, sortByDesc } from 'src/app/shared/util/sort';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getAllContractCategoriesSelector = createSelector(
  selectContractModuleState,
  state => state?.contractCategory?.contractCategories
);

export const getContractCategorySelector = createSelector(
  selectContractModuleState,
  state => Object.values(state?.contractCategory?.entities)
    .sort((a: ICategory, b: ICategory) => sortByAsc(a, b, 'position'))
);
export const getCategoryTermsSelector = createSelector(
  selectContractModuleState,
  state => state?.contractCategory?.selTermsForChecklist
);
