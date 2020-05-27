import { IImage } from './../../../../models/image.model';
import { IContractTerm } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum TermActionTypes {
  addContractTerm = '[Contract Term] Add',
  addContractTermSuccess = '[Contract Term] Add (success)',
  loadContractTerm = '[Contract Term] Load]',
  loadContractTermSuccess = '[Contract Term] Load (success)',
  deleteContractTerm = '[Contract Term] Delete',
  deleteContractTermSuccess = '[Contract Term] Delete (success)',
  updateContractTerm = '[Contract Term] Update',
  updateContractTermSuccess = '[Contract Term] Update (success)',
  uploadTermImage = '[Contract Term] Upload Image',
  saveTermImage = '[Contract Term] Save Image',
  saveTermImageSuccess = '[Contract Term] Save Image (success)'
}
export const saveTermImageSuccess = createAction(
  TermActionTypes.saveTermImageSuccess,
  props<{ created: any }>()
);
export const saveTermImage = createAction(
  TermActionTypes.saveTermImage,
  props<{ image: IImage }>()
);
export const uploadTermImage = createAction(
  TermActionTypes.uploadTermImage,
  props<{ file: any }>()
);
export const updateContractTerm = createAction(
  TermActionTypes.updateContractTerm,
  props<{ payload: IContractTerm }>()
);
export const updateContractTermSuccess = createAction(
  TermActionTypes.updateContractTermSuccess,
  props<{ updated: IContractTerm }>()
);
export const deleteContractTerm = createAction(
  TermActionTypes.deleteContractTerm,
  props<{ id: string }>()
);
export const deleteContractTermSuccess = createAction(
  TermActionTypes.deleteContractTermSuccess,
  props<{ deleted: IContractTerm }>()
);
export const addContractTerm = createAction(
  TermActionTypes.addContractTerm,
  props<{ payload: IContractTerm }>()
);
export const addContractTermSuccess = createAction(
  TermActionTypes.addContractTermSuccess,
  props<{ created: IContractTerm }>()
);
