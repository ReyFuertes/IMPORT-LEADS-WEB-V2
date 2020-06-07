import { addImageUploadState, removeImageUploadState } from './../actions/contracts.action';
import { ContractModuleState } from './index';
import { loadContracts, loadContractSuccess, addContractSuccess, cacheImages, clearCachedImages, updateContractSuccess, deleteContractSuccess } from '../actions/contracts.action';
import { IContract, IProductImage, IContractProduct } from './../../contract.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortCreatedAt } from 'src/app/shared/util/sort';

export interface ContractsState extends EntityState<IContract> {
  item?: IContract,
  created?: boolean,
  cachedImages: IProductImage[],
  isImageReady: boolean
}
export const adapter: EntityAdapter<IContract> = createEntityAdapter<IContract>({
  sortComparer: (a: IContract, b: IContract) => {
    if (a.created_at < b.created_at) return 1;
    if (a.created_at > b.created_at) return -1;
    return 0;
  }
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
  on(loadContracts, (state) => {
    return ({ ...adapter.removeAll(state) });
  }),
  on(loadContractSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  }),
  on(updateContractSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(addContractSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(cacheImages, (state, action) => {
    return ({ ...state, cachedImages: action.images })
  }),
  on(clearCachedImages, (state) => {
    return ({ ...state, cachedImages: null })
  })
);
export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}
export const getCachedImages = (state: ContractModuleState) => state.contract.cachedImages;
export const getAllContracts = (state: ContractModuleState) => {
  const contracts: IContract[] = state && state.contract.entities ? Object.values(state.contract.entities) : null;
  return contracts && contracts.sort((a: IContract, b: IContract) => sortCreatedAt(a, b));
};
export const getAllContractProducts = (state: ContractModuleState) => {
  const contractProducts: IContractProduct[] = state && state.contractProduct.entities ? Object.values(state.contractProduct.entities) : null;
  return contractProducts; // && products.sort((a: IContractProduct, b: IContractProduct) => sortCreatedAt(a, b));
};

