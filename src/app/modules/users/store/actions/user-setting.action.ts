import { createAction, props } from '@ngrx/store';
import { ICategory, ICategoryContract, ICategoryTemplate, IContract, IContractCategory } from 'src/app/modules/contracts/contract.model';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { IUserSettingsContractResponse } from '../../users.models';

export enum UserSettingActionTypes {
  loadUserSettingCategoryTemplateAction = '[User Setting] load category template',
  loadUserSettingCategoryTemplateSuccessAction = '[User Setting] load category template (success)',
  deleteUserSettingCategoryTemplateAction = '[User Setting] delete category template',
  deleteUserSettingCategoryTemplateSuccessAction = '[User Setting] delete category template (success)',
  deleteUserSettingTemplateCategoryAction = '[User Setting] delete category',
  deleteUserSettingTemplateCategorySuccessAction = '[User Setting] delete category (success)',
  deleteCategoryErrorAction = '[User Setting] delete category error',
  loadUserSettingContractByCategoryIdAction = '[User Setting] load contracts by category id',
  loadUserSettingContractByCategoryIdSuccessAction = '[User Setting] load contracts by category id (success)',
  // loadUserSettingCategoriesWithContractAction = '[User Setting] load categories with contract',
  // loadUserSettingCategoriesWithContractSuccessAction = '[User Setting] load categories with contract (success)',
  loadContractAsOptionAction = '[User Setting] load contract as option',
  loadContractAsOptionSuccessAction = '[User Setting] load contract as option (success)',
  associateCategoryTemplateToContractAction = '[User Setting] associate category to a contract',
  associateTemplateCategoryToContractSuccessAction = '[User Setting] associate category to a contract (success)',
  associateCategoryToContractFailedAction = '[User Setting] associate category to a contract (failed)',
  addContractToassociatedCategoryAction = '[User Setting] add contract to associated category',
}
export const addContractToassociatedCategoryAction = createAction(
  UserSettingActionTypes.addContractToassociatedCategoryAction,
  props<{ payload: { category: ICategory, contract: IContract } }>()
);
export const associateCategoryToContractFailedAction = createAction(
  UserSettingActionTypes.associateCategoryToContractFailedAction,
  props<{ error: any }>()
);
export const associateCategoryTemplateToContractAction = createAction(
  UserSettingActionTypes.associateCategoryTemplateToContractAction,
  props<{ payload: { id?: string, category: ICategory, contract: IContract, contract_category: IContractCategory } }>()
);
export const associateTemplateCategoryToContractSuccessAction = createAction(
  UserSettingActionTypes.associateTemplateCategoryToContractSuccessAction,
  props<{ response: any }>()
);
export const loadContractAsOptionAction = createAction(
  UserSettingActionTypes.loadContractAsOptionAction
);
export const loadContractAsOptionSuccessAction = createAction(
  UserSettingActionTypes.loadContractAsOptionSuccessAction,
  props<{ response: ISimpleItem[] }>()
);
// export const loadUserSettingCategoriesWithContractAction = createAction(
//   UserSettingActionTypes.loadUserSettingCategoriesWithContractAction
// );
// export const loadUserSettingCategoriesWithContractSuccessAction = createAction(
//   UserSettingActionTypes.loadUserSettingCategoriesWithContractSuccessAction,
//   props<{ response: ICategoryContract[] }>()
// );
export const loadUserSettingContractByCategoryIdAction = createAction(
  UserSettingActionTypes.loadUserSettingContractByCategoryIdAction,
  props<{ id: string }>()
);
export const loadUserSettingContractByCategoryIdSuccessAction = createAction(
  UserSettingActionTypes.loadUserSettingContractByCategoryIdSuccessAction,
  props<{ response: IUserSettingsContractResponse[] }>()
);
export const deleteUserSettingTemplateCategoryAction = createAction(
  UserSettingActionTypes.deleteUserSettingTemplateCategoryAction,
  props<{ id: string }>()
);
export const deleteUserSettingTemplateCategorySuccessAction = createAction(
  UserSettingActionTypes.deleteUserSettingTemplateCategorySuccessAction,
  props<{ deleted: ICategory }>()
);
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
