import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectContractCategoryTemplateModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getContractCategoryTemplatesSelector = createSelector(
  selectContractCategoryTemplateModuleState,
  state => state
    ? Object.values(state?.contractCategoryTemplate.entities)?.map(template => {
      return {
        ...template,
        contract: {
          label: template?.contract?.contract_name,
          value: template?.contract?.id
        }
      }
    })
    : []
);