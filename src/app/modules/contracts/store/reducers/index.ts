import { ContractChecklistState } from './contract-checklist.reducer';
import * as fromContract from '../reducers/contract.reducer';
import * as fromContractProducts from '../reducers/products.reducer';
import * as fromContractCategory from '../reducers/contract-category.reducer';
import * as fromCategory from '../reducers/category.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import * as fromChecklist from '../reducers/contract-checklist.reducer';

export interface ContractModuleState {
  contract: fromContract.ContractsState;
  contractProduct: fromContractProducts.ProductsState;
  contractCategory: fromContractCategory.ContractCategoryState,
  category: fromCategory.CategoryState,
  contractChecklist: ContractChecklistState
}

export const reducers: ActionReducerMap<ContractModuleState> = {
  contract: fromContract.ContractsReducer,
  contractProduct: fromContractProducts.ContractProductsReducer,
  contractCategory: fromContractCategory.ContractCategoryReducer,
  category: fromCategory.CategoryReducer,
  contractChecklist: fromChecklist.ContractChecklistReducer
};

export interface AppState extends fromRoot.AppState {
  contractsModule: ContractModuleState;
}


