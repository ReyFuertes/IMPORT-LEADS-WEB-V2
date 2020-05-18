import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromProducts from './products.reducer'

export const selectedState = (state: AppState) => state.products;
export const getProductsSelector = createSelector(
  selectedState,
  fromProducts.getAllProducts
);
