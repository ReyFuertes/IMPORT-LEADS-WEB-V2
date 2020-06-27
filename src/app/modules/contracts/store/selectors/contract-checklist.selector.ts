import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getContractChecklistSelector = createSelector(
  selectContractModuleState, state => state.checkList.checklist
);
export const getHighlightChecklist = createSelector(
  selectContractModuleState, state => state.checkList.isHighlighting
);
export const getSelectedProductTermsSelector = createSelector(
  selectContractModuleState, state => state.checkList.selectedTerms
);