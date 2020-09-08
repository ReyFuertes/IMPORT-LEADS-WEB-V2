import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ProductsService } from './../products.service';
import { IProduct } from './../products.model';
import { loadProductsAction, loadProductsSuccessAction, addProduct, addProductSuccessAction, deleteProduct, deleteProductSuccessAction, updateProductSuccessAction, updateProduct } from './products.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class ProductsEffect {
  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateProduct),
    mergeMap(({ item }) => this.productService.patch(item)
      .pipe(
        // reload all products since the child parent cost value cannot be updated via state update
        tap(() => this.store.dispatch(loadProductsAction())),
        map((updated: IProduct) => {
          return updateProductSuccessAction({ updated });
        })
      ))
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProduct),
    mergeMap(({ id }) => this.productService.delete(id)
      .pipe(
        map((deleted: IProduct) => {
          return deleteProductSuccessAction({ deleted });
        })
      ))
  ));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addProduct),
    mergeMap(({ item }) => this.productService.post(item)
      .pipe(
        map((created: IProduct) => {
          return addProductSuccessAction({ created });
        })
      ))
  ));

  loadProductsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductsAction),
    mergeMap(() => this.productService.getAll().pipe(
      map((items: IProduct[]) => {
        return loadProductsSuccessAction({ items });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private productService: ProductsService
  ) { }
}
