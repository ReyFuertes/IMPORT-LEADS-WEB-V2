import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserModuleState } from '../reducers';

export const selectUserModuleState = createFeatureSelector<UserModuleState>('usersModule');
export const getContractAsOptionSelector = createSelector(
  selectUserModuleState,
  state => state?.userSetting?.contractAsOption
);
export const getUserSettingContractsByCategoryIdSelector = createSelector(
  selectUserModuleState,
  state => state?.userSetting?.contractsByCategory
);
export const getUserSettingCategoriesWithContractSelector = createSelector(
  selectUserModuleState,
  state => state?.userSetting?.categoriesWithContract
);
export const getUserSettingCategoryTemplatesSelector = createSelector(
  selectUserModuleState,
  state => state?.userSetting?.categoryTemplates?.map(template => {
    return {
      ...template,
      contract: {
        label: template?.contract?.contract_name,
        value: template?.contract?.id
      }
    }
  })
);