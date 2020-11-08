import { ContractModuleState } from './../reducers/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromContracts from '../reducers/contract.reducer'

export const selectContractModuleState = createFeatureSelector<ContractModuleState>('contractsModule');
export const getUploadImageStateSelector = createSelector(
  selectContractModuleState,
  state => state.contract.isImageReady
);
export const getAllContractsSelector = createSelector(
  selectContractModuleState,
  state => Object.values(state.contract.entities)
);
export const getAllContractProductsSelector = createSelector(
  selectContractModuleState,
  fromContracts.getAllContractProducts
);
export const getCachedImages = createSelector(
  selectContractModuleState,
  fromContracts.getCachedImages
);
export const getContractById = (id: string) => createSelector(
  selectContractModuleState,
  (state: ContractModuleState) => state.contract.entities[id]
);
