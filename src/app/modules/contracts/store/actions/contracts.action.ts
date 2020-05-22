import { QueryParam } from './../../../../models/generic..model';
import { IContract, IProductImage } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  deleteContract = '[Contract] Delete',
  deleteContractSuccess = '[Contract] Delete (success)',
  LoadContracts = '[Contract] Load',
  LoadContractsSuccess = '[Contract] Load (success)',
  addContract = '[Contract] Add',
  addContractSuccess = '[Contract] Add (success)',
  UploadImages = '[Contract] Upload Images',
  UploadImagesSuccess = '[Contract] Upload Images (success)',
  ReorderImages = '[Contract] Reorder Images',
  ClearCachedImages = '[Contract] Clear Cached Images',
  updateContract = '[Contract] Update',
  updateContractSuccess = '[Contract] Update (success)',
}
export const deleteContract = createAction(
  ContractActionTypes.deleteContract,
  props<{ id: string }>()
);
export const deleteContractSuccess = createAction(
  ContractActionTypes.deleteContractSuccess,
  props<{ deleted: IContract }>()
);
export const updateContract = createAction(
  ContractActionTypes.updateContract,
  props<{ item: IContract }>()
);
export const updateContractSuccess = createAction(
  ContractActionTypes.updateContractSuccess,
  props<{ updated: IContract }>()
);
export const loadContracts = createAction(
  ContractActionTypes.LoadContracts,
  props<{ param }>()
);
export const loadContractSuccess = createAction(
  ContractActionTypes.LoadContractsSuccess,
  props<{ items: IContract[] }>()
);
export const addContract = createAction(
  ContractActionTypes.addContract,
  props<{ item: IContract }>()
);
export const addContractSuccess = createAction(
  ContractActionTypes.addContractSuccess,
  props<{ created: IContract }>()
);
export const uploadContractImages = createAction(
  ContractActionTypes.UploadImages,
  props<{ files: any }>()
);
export const uploadContractImageSuccess = createAction(
  ContractActionTypes.UploadImagesSuccess,
  props<{ Image?: boolean }>()
);
export const cacheImages = createAction(
  ContractActionTypes.UploadImagesSuccess,
  props<{ images: IProductImage[] }>()
);
export const ReOrderImages = createAction(
  ContractActionTypes.ReorderImages,
  props<{ images: IProductImage[] }>()
);
export const clearCachedImages = createAction(
  ContractActionTypes.ClearCachedImages
);
