import { createAction, props } from '@ngrx/store';

export enum CategoryTemplateActionTypes {
  saveCategoryTemplateAction = '[Category Template] save category template',
  saveCategoryTemplateSuccessAction = '[Category Template] save category template (success)',
  loadCategoryTemplatesAction = '[Category Template] load category template',
  loadCategoryTemplatesSuccessAction = '[Category Template] load category template (success)'
}
export const loadCategoryTemplatesAction = createAction(
  CategoryTemplateActionTypes.loadCategoryTemplatesAction
);
export const loadCategoryTemplatesSuccessAction = createAction(
  CategoryTemplateActionTypes.loadCategoryTemplatesSuccessAction,
  props<{ response: any }>()
);
export const saveCategoryTemplateAction = createAction(
  CategoryTemplateActionTypes.saveCategoryTemplateAction,
  props<{ payload: any }>()
);
export const saveCategoryTemplateSuccessAction = createAction(
  CategoryTemplateActionTypes.saveCategoryTemplateSuccessAction,
  props<{ response: any }>()
);