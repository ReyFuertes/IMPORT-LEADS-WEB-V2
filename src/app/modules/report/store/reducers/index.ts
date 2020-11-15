import { ActionReducerMap } from '@ngrx/store';
import { ContractCategoryReducer, ContractCategoryState } from 'src/app/modules/contracts/store/reducers/contract-category.reducer';
import { ContractProductsReducer, ContractProductsState } from 'src/app/modules/contracts/store/reducers/contract-product.reducer';
import { ContractsReducer, ContractsState } from 'src/app/modules/contracts/store/reducers/contract.reducer';
import * as fromRoot from 'src/app/store/app.reducer';

export interface ReportModuleState {
  contract: ContractsState;
  contractProduct: ContractProductsState,
  contractCategory: ContractCategoryState
}

export const reducers: ActionReducerMap<ReportModuleState> = {
  contract: ContractsReducer,
  contractProduct: ContractProductsReducer,
  contractCategory: ContractCategoryReducer
};

export interface AppState extends fromRoot.AppState {
  reportModule: ReportModuleState;
}


