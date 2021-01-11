import { addImageUploadState, removeImageUploadState, uploadContractImageSuccessAction } from './../actions/contracts.action';
import { ContractModuleState } from './index';
import { loadContractsAction, loadContractSuccessAction, addContractSuccessAction, cacheImagesAction, clearCachedImagesAction, updateContractSuccess, deleteContractSuccessAction, addContractAction } from '../actions/contracts.action';
import { IContract, IProductImage, IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean,
  cachedImages: IProductImage[],
  isImageReady: boolean,
  isAddingOrUpdating: boolean
}
export const adapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({});

export const initialState: ContractsState = adapter.getInitialState({
  item: null,
  created: null,
  cachedImages: null,
  isImageReady: null,
  isAddingOrUpdating: null
});
const contractsReducer = createReducer(
  initialState,
  /* we need to check if the contract is updating or adding, so that it will sync with the event actions */
  on(addContractAction, (state) => { 
    return Object.assign({}, state, { isAddingOrUpdating: true })
  }),
  on(addContractSuccessAction, (state) => {
    return Object.assign({}, state, { isAddingOrUpdating: false })
  }),
  
  on(addImageUploadState, (state, action) => {
    return Object.assign({}, state, { isImageReady: action.isImageReady, isAddingOrUpdating: true })
  }),
  on(uploadContractImageSuccessAction, (state) => {
    return Object.assign({}, state, { isAddingOrUpdating: false })
  }),
  on(deleteContractSuccessAction, (state, action) => {
    return ({ ...adapter.removeOne(action.deleted.id, state) })
  }),
  on(loadContractsAction, (state) => {
    return ({ ...adapter.removeAll(state) });
  }),
  on(loadContractSuccessAction, (state, action) => {
    return ({ ...adapter.setAll(action.items, state) })
  }),
  on(updateContractSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(addContractSuccessAction, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(cacheImagesAction, (state, action) => {
    return ({ ...state, cachedImages: action.images })
  }),
  on(clearCachedImagesAction, (state) => {
    return ({ ...state, cachedImages: null })
  })
);
export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}
export const getCachedImages = (state: ContractModuleState) => state.contract.cachedImages;
export const getAllContractProducts = (state: ContractModuleState) => {
  const contractProducts: IContractProduct[] = state && state.contractProduct.entities ? Object.values(state.contractProduct.entities) : null;
  return contractProducts; // && products.sort((a: IContractProduct, b: IContractProduct) => sortByDesc(a, b));
};

