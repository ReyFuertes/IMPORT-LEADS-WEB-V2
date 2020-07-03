import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');

export const getChecklistItemsSelector = createSelector(
  selectContractModuleState, state => {
    
    return Object.values(state.checkList.entities);
  }
);
export const getChecklistSourceSelector = createSelector(
  selectContractModuleState, state => state.checkList.checklistSource
);

export const getHighlightChecklist = createSelector(
  selectContractModuleState, state => state.checkList.isHighlighting
);
export const getSelectedProductTermsSelector = createSelector(
  selectContractModuleState, state => state.checkList.selectedTerms
);

