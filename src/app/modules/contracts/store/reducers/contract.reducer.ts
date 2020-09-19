import { addImageUploadState, removeImageUploadState } from './../actions/contracts.action';
import { ContractModuleState } from './index';
import { loadContractsAction, loadContractSuccessAction, addContractSuccessAction, cacheImagesAction, clearCachedImagesAction, updateContractSuccess, deleteContractSuccess } from '../actions/contracts.action';
import { IContract, IProductImage, IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortByDesc } from 'src/app/shared/util/sort';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean,
  cachedImages: IProductImage[],
  isImageReady: boolean
}
export const adapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({
  sortComparer: (a, b) => sortByDesc(a, b, 'created_at')
});
export const initialState: ContractsState = adapter.getInitialState({
  item: null,
  created: null,
  cachedImages: null,
  isImageReady: null
});
const contractsReducer = createReducer(
  initialState,
  on(removeImageUploadState, (state, action) => {
    return Object.assign({}, state, { isImageReady: null })
  }),
  on(addImageUploadState, (state, action) => {
    return Object.assign({}, state, { isImageReady: action.isImageReady })
  }),
  on(deleteContractSuccess, (state, action) => {
    return ({ ...adapter.removeOne(action.deleted.id, state) })
  }),
  on(loadContractsAction, (state) => {
    return ({ ...adapter.removeAll(state) });
  }),
  on(loadContractSuccessAction, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
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
export const getAllContracts = (state: ContractModuleState) => {
  const contracts: IContract[] = state && state.contract.entities ? Object.values(state.contract.entities) : null;
  return contracts && contracts.sort((a: IContract, b: IContract) => sortByDesc(a, b, 'created_at'));
};
export const getAllContractProducts = (state: ContractModuleState) => {
  const contractProducts: IContractProduct[] = state && state.contractProduct.entities ? Object.values(state.contractProduct.entities) : null;
  return contractProducts; // && products.sort((a: IContractProduct, b: IContractProduct) => sortByDesc(a, b));
};

