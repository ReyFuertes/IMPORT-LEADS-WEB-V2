import { IImage } from './../../../../models/image.model';
import { IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum TermTagActionTypes {
  updateContractTermTagAction = '[Contract Term tag] Update',
  updateContractTermTagSuccessAction = '[Contract Term tag] Update (success)'
}
export const updateContractTermTagAction = createAction(
  TermTagActionTypes.updateContractTermTagAction,
  props<{ payload: any }>()
);
export const updateContractTermTagSuccessAction = createAction(
  TermTagActionTypes.updateContractTermTagSuccessAction,
  props<{ updated: any }>()
);