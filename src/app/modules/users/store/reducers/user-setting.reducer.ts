import { createReducer, on, Action } from "@ngrx/store";
import { ICategory, ICategoryContract, ICategoryTemplate, IContract, IContractCategoryReponse } from "src/app/modules/contracts/contract.model";
import { deleteUserSettingCategorySuccessAction, deleteUserSettingCategoryTemplateSuccessAction, loadContractAsOptionSuccessAction, loaduserSettingCategoriesWithContractSuccessAction, loadUserSettingCategoryTemplateSuccessAction, loadUserSettingContractByCategoryIdSuccessAction } from "../actions/user-setting.action";
import * as _ from 'lodash';

export interface UserSettingState {
  categoryTemplates?: ICategoryTemplate[],
  categoriesWithContract?: ICategoryContract[],
  contractsByCategory?: IContractCategoryReponse[],
  contractAsOption?: IContract[]
}
export const initialState: UserSettingState = {
  categoryTemplates: null,
  categoriesWithContract: null,
  contractsByCategory: null,
  contractAsOption: null
};
const userSettingReducer = createReducer(
  initialState,
  on(loadContractAsOptionSuccessAction, (state, action) => {
    return Object.assign({}, state, { contractAsOption: action.response });
  }),
  on(loaduserSettingCategoriesWithContractSuccessAction, (state, action) => {
    return Object.assign({}, state, { categoriesWithContract: action.response });
  }),
  on(loadUserSettingContractByCategoryIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { contractsByCategory: action.response });
  }),
  on(deleteUserSettingCategorySuccessAction, (state, action) => {
    const items = state?.categoriesWithContract.filter(t => t.id === action?.deleted?.id);

    let categories: ICategory[] = Object.assign([], state?.categoriesWithContract);
    if (items && items.length > 0) {
      items.forEach(item => {
        _.remove(categories, { id: item?.id });
      });
    }

    return Object.assign({}, state, { categories });
  }),
  on(deleteUserSettingCategoryTemplateSuccessAction, (state, action) => {
    const items = state?.categoryTemplates.filter(t => t.id === action?.deleted?.id);

    let categoryTemplates: ICategoryTemplate[] = Object.assign([], state?.categoryTemplates);
    if (items && items.length > 0) {
      items.forEach(item => {
        _.remove(categoryTemplates, { id: item?.id });
      });
    }

    return Object.assign({}, state, { categoryTemplates });
  }),
  on(loadUserSettingCategoryTemplateSuccessAction, (state, action) => {
    return Object.assign({}, state, { categoryTemplates: action.response });
  })
);
export function UserSettingReducer(state: UserSettingState, action: Action) {
  return userSettingReducer(state, action);
}