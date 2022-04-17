import { createReducer, on, Action } from "@ngrx/store";
import { ICategory, ICategoryContract, ICategoryTemplate, IContract, IContractCategoryReponse } from "src/app/modules/contracts/contract.model";
import { addContractToassociatedCategoryAction, deleteUserSettingTemplateCategorySuccessAction, deleteUserSettingCategoryTemplateSuccessAction, loadContractAsOptionSuccessAction, loadUserSettingCategoryTemplateSuccessAction, loadUserSettingContractByCategoryIdSuccessAction } from "../actions/user-setting.action";
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
  on(addContractToassociatedCategoryAction, (state, action) => {
    let categoriesWithContract: ICategoryContract[] = Object.assign([], state?.categoriesWithContract);
    const { category, contract } = action?.payload;
    const match = categoriesWithContract.find(value =>
      category?.id === value.id
      && contract?.id === value.contract?.id);
    if (!match) {
      categoriesWithContract.push({
        id: category?.id,
        category_name: category?.category_name,
        contract
      });
    };
    return Object.assign({}, state, { categoriesWithContract });
  }),
  on(loadContractAsOptionSuccessAction, (state, action) => {
    return Object.assign({}, state, { contractAsOption: action.response });
  }),
  // on(loadUserSettingCategoriesWithContractSuccessAction, (state, action) => {
  //   return Object.assign({}, state, { categoriesWithContract: action.response });
  // }),
  on(loadUserSettingContractByCategoryIdSuccessAction, (state, action) => {
    return Object.assign({}, state, { contractsByCategory: action.response });
  }),
  on(deleteUserSettingTemplateCategorySuccessAction, (state, action) => {
    const items = state?.categoryTemplates.filter(t => t.id === action?.deleted?.id);

    let categoryTemplates: ICategoryTemplate[] = Object.assign([], state?.categoryTemplates);
    if (items?.length > 0) {
      items.forEach(item => {
        _.remove(categoryTemplates, { id: item?.id });
      });
    }

    return Object.assign({}, state, { categoryTemplates });
  }),
  on(deleteUserSettingCategoryTemplateSuccessAction, (state, action) => {
    const items = state?.categoryTemplates.filter(t => t.id === action?.deleted?.id);

    let categoryTemplates: ICategoryTemplate[] = Object.assign([], state?.categoryTemplates);
    if (items?.length > 0) {
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