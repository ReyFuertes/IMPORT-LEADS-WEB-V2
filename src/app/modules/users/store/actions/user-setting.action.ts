import { createAction, props } from '@ngrx/store';
import { ICategory, ICategoryContract, ICategoryTemplate, IContract } from 'src/app/modules/contracts/contract.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { IUserSettingsContractResponse } from '../../users.models';

export enum UserSettingActionTypes {
  loadUserSettingCategoryTemplateAction = '[User Setting] load category template',
  loadUserSettingCategoryTemplateSuccessAction = '[User Setting] load category template (success)',
  deleteUserSettingCategoryTemplateAction = '[User Setting] delete category template',
  deleteUserSettingCategoryTemplateSuccessAction = '[User Setting] delete category template (success)',
  // loaduserSettingCategoriesAction = '[User Setting] load categories',
  // loaduserSettingCategoriesSuccessAction = '[User Setting] load categories (success)',
  deleteUserSettingCategoryAction = '[User Setting] delete category',
  deleteUserSettingCategorySuccessAction = '[User Setting] delete category (success)',
  deleteCategoryErrorAction = '[User Setting] delete category error',
  loadUserSettingContractByCategoryIdAction = '[User Setting] load contracts by category id',
  loadUserSettingContractByCategoryIdSuccessAction = '[User Setting] load contracts by category id (success)',
  loaduserSettingCategoriesWithContractAction = '[User Setting] load categories with contract',
  loaduserSettingCategoriesWithContractSuccessAction = '[User Setting] load categories with contract (success)',
  loadContractAsOptionAction = '[User Setting] load contract as option',
  loadContractAsOptionSuccessAction = '[User Setting] load contract as option (success)'
}
export const loadContractAsOptionAction = createAction(
  UserSettingActionTypes.loadContractAsOptionAction
);
export const loadContractAsOptionSuccessAction = createAction(
  UserSettingActionTypes.loadContractAsOptionSuccessAction,
  props<{ response: ISimpleItem[] }>()
);
export const loaduserSettingCategoriesWithContractAction = createAction(
  UserSettingActionTypes.loaduserSettingCategoriesWithContractAction
);
export const loaduserSettingCategoriesWithContractSuccessAction = createAction(
  UserSettingActionTypes.loaduserSettingCategoriesWithContractSuccessAction,
  props<{ response: ICategoryContract[] }>()
);
export const loadUserSettingContractByCategoryIdAction = createAction(
  UserSettingActionTypes.loadUserSettingContractByCategoryIdAction,
  props<{ id: string }>()
);
export const loadUserSettingContractByCategoryIdSuccessAction = createAction(
  UserSettingActionTypes.loadUserSettingContractByCategoryIdSuccessAction,
  props<{ response: IUserSettingsContractResponse[] }>()
);
export const deleteUserSettingCategoryAction = createAction(
  UserSettingActionTypes.deleteUserSettingCategoryAction,
  props<{ id: string }>()
);
export const deleteUserSettingCategorySuccessAction = createAction(
  UserSettingActionTypes.deleteUserSettingCategorySuccessAction,
  props<{ deleted: ICategory }>()
);
// export const loaduserSettingCategoriesAction = createAction(
//   UserSettingActionTypes.loaduserSettingCategoriesAction
// );
// export const loaduserSettingCategoriesSuccessAction = createAction(
//   UserSettingActionTypes.loaduserSettingCategoriesSuccessAction,
//   props<{ response: ICategory[] }>()
// );
export const deleteUserSettingCategoryTemplateAction = createAction(
  UserSettingActionTypes.deleteUserSettingCategoryTemplateAction,
  props<{ id: string }>()
);
export const deleteUserSettingCategoryTemplateSuccessAction = createAction(
  UserSettingActionTypes.deleteUserSettingCategoryTemplateSuccessAction,
  props<{ deleted: ICategoryTemplate }>()
);
export const loadUserSettingCategoryTemplateAction = createAction(
  UserSettingActionTypes.loadUserSettingCategoryTemplateAction
);
export const loadUserSettingCategoryTemplateSuccessAction = createAction(
  UserSettingActionTypes.loadUserSettingCategoryTemplateSuccessAction,
  props<{ response: ICategoryTemplate[] }>()
);
