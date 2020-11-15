import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContractsModule } from 'src/app/modules/contracts/contracts.module';
import { ContractModuleState } from 'src/app/modules/contracts/store/reducers';

export const selectContractModuleState = createFeatureSelector<ContractsModule>('contractsModule');

export const getReportContractById = (id: string) => createSelector(
  selectContractModuleState,
  (state: ContractModuleState) => {
    return state?.contract?.entities[id];
  }
);
