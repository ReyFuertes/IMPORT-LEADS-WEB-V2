import { createAction, props } from '@ngrx/store';
import { IContractTemplatePayload } from '../../contract.model';

export enum ContractTemplateActionTypes {
  saveContractTemplateAction = '[Contract Template] save contract template',
  saveContractTemplateSuccessAction = '[Contract Template] save contract template (success)',
  loadContractTemplatesAction = '[Contract Template] load contract template',
  loadContractTemplatesSuccessAction = '[Contract Template] load contract template (success)'
}
export const loadContractTemplatesAction = createAction(
  ContractTemplateActionTypes.loadContractTemplatesAction
);
export const loadContractTemplatesSuccessAction = createAction(
  ContractTemplateActionTypes.loadContractTemplatesSuccessAction,
  props<{ response: any }>()
);
export const saveContractTemplateAction = createAction(
  ContractTemplateActionTypes.saveContractTemplateAction,
  props<{ payload: IContractTemplatePayload }>()
);
export const saveContractTemplateSuccessAction = createAction(
  ContractTemplateActionTypes.saveContractTemplateSuccessAction,
  props<{ response: any }>()
);