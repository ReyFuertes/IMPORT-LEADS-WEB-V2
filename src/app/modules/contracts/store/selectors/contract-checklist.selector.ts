import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getChecklistStatusSelector = createSelector(
  selectContractModuleState, state => state.checkList.multiUpdate
);
export const getChecklistSelector = createSelector(
  selectContractModuleState, state => state.checkList
);
export const getchecklistProductsSelector = createSelector(
  selectContractModuleState, state => state.checkList.checklistProducts
);
export const getChecklistTermsByProductId = (productId: string) => createSelector(
  selectContractModuleState, state => {
    const items = Object.values(state.checkList.entities);
    const results = items.filter(ci =>
      ci.contract_product
      && ci.contract_product.product
      && ci.contract_product.product.id === productId);
    return results;
  }
);
export const getChecklistItemByContractProductIds = (productId: string, contractId: string) => createSelector(
  selectContractModuleState, state => {
    const items = Object.values(state.checkList.entities);
    const ret = items.filter(ci => ci.contract_product.id === productId
      && ci.contract_contract.id === contractId).shift();

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
  selectContractModuleState, state => state.checkList.checklistTerms
);

