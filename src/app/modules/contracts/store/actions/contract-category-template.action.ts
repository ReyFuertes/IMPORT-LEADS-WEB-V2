import { createAction, props } from '@ngrx/store';
import { IContractCategoryTemplate } from '../../contract.model';

export enum ContractCategoryTemplateActionTypes {
  saveContractCategoryTemplateAction = '[Contract Category Template] save contract category template',
  saveContractCategoryTemplateSuccessAction = '[Contract Category Template] save contract category template (success)',
  loadContractCategoryTemplateAction = '[Contract Category Template] load contract category template',
  loadContractCategoryTemplateSuccessAction = '[Contract Category Template] load contract category template (success)',
  deleteContractCategoryTemplateAction = '[Contract Category Template] delete contract category template',
  deleteContractCategoryTemplateSuccessAction = '[Contract Category Template] delete contract category template (success)',
}
export const deleteContractCategoryTemplateAction = createAction(
  ContractCategoryTemplateActionTypes.deleteContractCategoryTemplateAction,
  props<{ id: string, category_template_id?: string, contract_category_id?: string, contract_id?: string }>()
);
export const deleteContractCategoryTemplateSuccessAction = createAction(
  ContractCategoryTemplateActionTypes.deleteContractCategoryTemplateSuccessAction,
  props<{ deleted: IContractCategoryTemplate }>()
);
export const loadContractCategoryTemplateAction = createAction(
  ContractCategoryTemplateActionTypes.loadContractCategoryTemplateAction
);
export const loadContractCategoryTemplateSuccessAction = createAction(
  ContractCategoryTemplateActionTypes.loadContractCategoryTemplateSuccessAction,
  props<{ response: IContractCategoryTemplate[] }>()
);
export const saveContractCategoryTemplateAction = createAction(
  ContractCategoryTemplateActionTypes.saveContractCategoryTemplateAction,
  props<{ payload: any }>()
);
export const saveContractCategoryTemplateSuccessAction = createAction(
  ContractCategoryTemplateActionTypes.saveContractCategoryTemplateSuccessAction,
  props<{ response: any }>()
);