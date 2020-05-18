import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ProductsService } from './../products.service';
import { IProduct } from './../products.model';
import { loadProducts, loadProductsSuccess, addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, updateProductSuccess, updateProduct } from './products.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProduct),
    mergeMap(({ item }) => this.productService.patch(item)
      .pipe(
        // reload all products since the child parent cost value cannot be updated via state update
        tap(() => this.store.dispatch(loadProducts())),
        map((updated: IProduct) => {
          return updateProductSuccess({ updated });
        })
      ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap(({ id }) => this.productService.delete(id)
      .pipe(
        map((deleted: IProduct) => {
          return deleteProductSuccess({ deleted });
        })
      ))
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    mergeMap(({ item }) => this.productService.post(item)
      .pipe(
        map((created: IProduct) => {
          return addProductSuccess({ created });
        })
      ))
  ));

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.productService.getAll().pipe(
      map((items: IProduct[]) => {
        return loadProductsSuccess({ items });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private productService: ProductsService
  ) { }
}
