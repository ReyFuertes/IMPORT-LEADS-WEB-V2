import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getChecklist = createSelector(
  selectContractModuleState, state => state.checkList
);
export const getChecklistTermsById = (productId: string) => createSelector(
  selectContractModuleState, state => {
    const items = Object.values(state.checkList.entities);
    const results = items.filter(ci => ci.checklist_product.id === productId);
    return results;
  }
);
export const getChecklistItemByContractProductIds = (productId: string, contractId: string) => createSelector(
  selectContractModuleState, state => {
    const items = Object.values(state.checkList.entities);
    const ret = items.filter(ci => ci.checklist_product.id === productId
      && ci.checklist_contract.id === contractId).shift();

    return ret;
  }
);
export const getChecklistItemsSelector = createSelector(
  selectContractModuleState, state => Object.values(state.checkList.entities)
);
export const getChecklistSourceSelector = createSelector(
  selectContractModuleState, state => state.checkList.checklistSource
);

export const getHighlightChecklist = createSelector(
  selectContractModuleState, state => state.checkList.isHighlighting
);
export const getSelectedTermsSelector = createSelector(
  selectContractModuleState, state => state.checkList.selectedTerms
);

