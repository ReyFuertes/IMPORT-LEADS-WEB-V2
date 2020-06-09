import { ISimpleItem } from './../../../shared/generics/generic.model';
import { loadProducts, loadProductsSuccess, addProductSuccess, deleteProductSuccess, updateProductSuccess } from './products.actions';
import { IProduct } from './../products.model';
import { createReducer, on, Action } from "@ngrx/store";
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { sortByDesc } from 'src/app/shared/util/sort';

export interface ContractProductsState extends EntityState<IProduct> {
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({});
export const initialState: ContractProductsState = adapter.getInitialState({

});
const productsReducer = createReducer(
  initialState,
  on(updateProductSuccess, (state, action) => {
    return adapter.updateOne({ id: action.updated.id, changes: action.updated }, state)
  }),
  on(deleteProductSuccess, (state, action) => {
    return adapter.removeOne(action.deleted.id, state)
  }),
  on(addProductSuccess, (state, action) => {
    return adapter.addOne(action.created, state)
  }),
  on(loadProducts, (state) => {
    return ({ ...adapter.removeAll(state) })
  }),
  on(loadProductsSuccess, (state, action) => {
    return ({ ...adapter.addAll(action.items, state) })
  })
);
export function ProductsReducer(state: ContractProductsState, action: Action) {
  return productsReducer(state, action);
}
export const getAllProducts = (state: ContractProductsState) => {
  let products = state && state.entities ? Object.values(state.entities) : null;
  products = products && products.map(p => {
    return {
      cost: p.cost || 0,
      created_at: p.created_at,
      id: p.id,
      parent: p.parent,
      product_name: p.product_name,
      qty: p.qty || 0,
      updated_at: p.updated_at
    }
  })
  return products; //.sort((a: IProduct, b: IProduct) => sortByDesc(a, b, 'created_at'));
};
