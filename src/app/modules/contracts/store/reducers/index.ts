import { ContractChecklistState } from './contract-checklist.reducer';
import * as fromContract from '../reducers/contract.reducer';
import * as fromContractProducts from '../reducers/contract-product.reducer';
import * as fromContractCategory from '../reducers/contract-category.reducer';
import * as fromCategory from '../reducers/category.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from 'src/app/store/app.reducer';
import * as fromChecklist from '../reducers/contract-checklist.reducer';
import * as fromInspection from '../../../inspections/store/reducers/inspection.reducer';
import * as fromSavedChecklistItem from '../../store/reducers/saved-checklist-item.reducer';
import * as fromSavedChecklist from '../../store/reducers/saved-checklist.reducer';
import { ContractTemplateReducer, ContractTemplateState } from './contract-template.reducer';
import { CategoryTemplateReducer, CategoryTemplateState } from './category-template.reducer';

export interface ContractModuleState {
  contract: fromContract.ContractsState;
  contractProduct: fromContractProducts.ContractProductsState;
  contractCategory: fromContractCategory.ContractCategoryState,
  category: fromCategory.CategoryState,
  checkList: fromChecklist.ContractChecklistState,
  inspection: fromInspection.InspectionState,
  savedChecklistItem: fromSavedChecklistItem.SavedChecklistItemState,
  savedChecklist: fromSavedChecklist.SavedChecklistState,
  contractTemplate: ContractTemplateState,
  categoryTemplate: CategoryTemplateState
}

export const reducers: ActionReducerMap<ContractModuleState> = {
  contract: fromContract.ContractsReducer,
  contractProduct: fromContractProducts.ContractProductsReducer,
  contractCategory: fromContractCategory.ContractCategoryReducer,
  category: fromCategory.CategoryReducer,
  checkList: fromChecklist.ContractChecklistReducer,
  inspection: fromInspection.InspectionReducer,
  savedChecklistItem: fromSavedChecklistItem.SavedChecklistItemReducer,
  savedChecklist: fromSavedChecklist.SavedChecklistReducer,
  contractTemplate: ContractTemplateReducer,
  categoryTemplate: CategoryTemplateReducer
};

export interface AppState extends fromRoot.AppState {
  contractsModule: ContractModuleState;
}


