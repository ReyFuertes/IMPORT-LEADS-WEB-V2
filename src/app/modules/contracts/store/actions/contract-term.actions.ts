import { IImage } from './../../../../models/image.model';
import { IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum TermActionTypes {
  addContractTermAction = '[Contract Term] Add',
  addContractTermSuccessAction = '[Contract Term] Add (success)',
  loadContractTerm = '[Contract Term] Load]',
  loadContractTermSuccess = '[Contract Term] Load (success)',
  deleteContractTermAction = '[Contract Term] Delete',
  deleteContractTermSuccess = '[Contract Term] Delete (success)',
  updateContractTermAction = '[Contract Term] Update',
  updateContractTermSuccessAction = '[Contract Term] Update (success)',
  saveTermImageDetailAction = '[Contract Term] Save Image',
  saveTermImageSuccess = '[Contract Term] Save Image (success)'
}
export const saveTermImageSuccess = createAction(
  TermActionTypes.saveTermImageSuccess,
  props<{ created: any }>()
);
export const saveTermImageDetailAction = createAction(
  TermActionTypes.saveTermImageDetailAction,
  props<{ image: IImage }>()
);
export const updateContractTermAction = createAction(
  TermActionTypes.updateContractTermAction,
  props<{ payload: IContractTerm }>()
);
export const updateContractTermSuccessAction = createAction(
  TermActionTypes.updateContractTermSuccessAction,
  props<{ updated: IContractTerm }>()
);
export const deleteContractTermAction = createAction(
  TermActionTypes.deleteContractTermAction,
  props<{ id: string }>()
);
export const deleteContractTermSuccess = createAction(
  TermActionTypes.deleteContractTermSuccess,
  props<{ deleted: IContractTerm }>()
);
export const addContractTermAction = createAction(
  TermActionTypes.addContractTermAction,
  props<{ payload: IContractTerm }>()
);
export const addContractTermSuccessAction = createAction(
  TermActionTypes.addContractTermSuccessAction,
  props<{ created: IContractTerm }>()
);
