import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getSelectedProductsSelector = createSelector(
  selectContractModuleState, state => state.contractProduct.selectedProduct
);
