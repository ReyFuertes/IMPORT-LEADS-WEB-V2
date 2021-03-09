import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ProductsService } from './../products.service';
import { IProduct } from './../products.model';
import { loadProductsAction, loadProductsSuccessAction, addProductAction, addProductSuccessAction, deleteProductAction, deleteProductSuccessAction, updateProductSuccessAction, updateProductAction, deleteErrorAction } from './products.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffect {
  updateProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateProductAction),
    switchMap(({ item }) => this.productService.patch(item)
      .pipe(
        map((updated: IProduct) => {
          this.store.dispatch(loadProductsAction())

          return updateProductSuccessAction({ updated });
        })
      ))
  ));

  deleteProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteProductAction),
    switchMap(({ id }) => this.productService.delete(id).pipe(
      map((deleted: IProduct) => {
        return deleteProductSuccessAction({ deleted });
      }),
      catchError((error) => {
        console.log('%c PRODUCT CANNOT BE DELETED! ', 'background: red; color: white');
        console.log('Error: ',  error?.message)
        return of(deleteErrorAction());
      })
    ))
  ));

  addProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(addProductAction),
    switchMap(({ item }) => this.productService.post(item)
      .pipe(
        map((created: IProduct) => {
          return addProductSuccessAction({ created });
        })
      ))
  ));

  loadProductsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadProductsAction),
    switchMap(() => this.productService.getAll().pipe(
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
