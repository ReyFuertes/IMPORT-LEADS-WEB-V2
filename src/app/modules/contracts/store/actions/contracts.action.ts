import { QueryParam } from './../../../../models/generic..model';
import { IContract, IProductImage } from './../../contract.model';
import { createAction, props } from '@ngrx/store';

export enum ContractActionTypes {
  deleteContractAction = '[Contract] Delete',
  deleteContractSuccess = '[Contract] Delete (success)',
  LoadContracts = '[Contract] Load',
  LoadContractsSuccess = '[Contract] Load (success)',
  addContractAction = '[Contract] Add',
  addContractSuccess = '[Contract] Add (success)',
  UploadImages = '[Contract] Upload Images',
  UploadImagesSuccess = '[Contract] Upload Images (success)',
  ReorderImages = '[Contract] Reorder Images',
  ClearCachedImages = '[Contract] Clear Cached Images',
  updateContractAction = '[Contract] Update',
  updateContractSuccess = '[Contract] Update (success)',
  addImageUploadState = '[Contract] Add upload (success)',
  removeImageUploadState = '[Contract] Remove upload (success)',
  uploadTermImageAction = '[Contract Term] Upload Image',
}
export const uploadTermImageAction = createAction(
  ContractActionTypes.uploadTermImageAction,
  props<{ file: any }>()
);
export const addImageUploadState = createAction(
  ContractActionTypes.addImageUploadState,
  props<{ isImageReady: boolean }>()
);
export const removeImageUploadState = createAction(
  ContractActionTypes.removeImageUploadState,
);
export const deleteContractAction = createAction(
  ContractActionTypes.deleteContractAction,
  props<{ id: string }>()
);
export const deleteContractSuccess = createAction(
  ContractActionTypes.deleteContractSuccess,
  props<{ deleted: IContract }>()
);
export const updateContractAction = createAction(
  ContractActionTypes.updateContractAction,
  props<{ item: IContract }>()
);
export const updateContractSuccess = createAction(
  ContractActionTypes.updateContractSuccess,
  props<{ updated: IContract }>()
);
export const loadContractsAction = createAction(
  ContractActionTypes.LoadContracts,
  props<{ param }>()
);
export const loadContractSuccess = createAction(
  ContractActionTypes.LoadContractsSuccess,
  props<{ items: IContract[] }>()
);
export const addContractAction = createAction(
  ContractActionTypes.addContractAction,
  props<{ item: IContract }>()
);
export const addContractSuccess = createAction(
  ContractActionTypes.addContractSuccess,
  props<{ created: IContract }>()
);
export const uploadContractImagesAction = createAction(
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
export const ReOrderImagesAction = createAction(
  ContractActionTypes.ReorderImages,
  props<{ images: IProductImage[] }>()
);
export const clearCachedImages = createAction(
  ContractActionTypes.ClearCachedImages
);
