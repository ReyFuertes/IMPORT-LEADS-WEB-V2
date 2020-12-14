import { createAction, props } from '@ngrx/store';
import { IContractTemplatePayload } from '../../contract.model';

export enum ContractTemplateActionTypes {
  saveContractTemplateAction = '[Contract Template] save contract template',
  saveContractTemplateSuccessAction = '[Contract Template] save contract template (success)'
}
export const saveContractTemplateAction = createAction(
  ContractTemplateActionTypes.saveContractTemplateAction,
  props<{ payload: IContractTemplatePayload }>()
);
export const saveContractTemplateSuccessAction = createAction(
  ContractTemplateActionTypes.saveContractTemplateSuccessAction,
  props<{ response: any }>()
);