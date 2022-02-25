import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { IContractProduct } from './../../contract.model';
import { map, switchMap } from 'rxjs/operators';
import { ContractProductService } from './../../services/contract-products.service';
import { addContractProductsAction, addContractProductsSuccessAction, loadContractProductsAction, loadContractProductSuccessAction, deleteContractProduct, updateContractProductsSuccessAction, updateContractProductAction, removeSelectedProductAction } from './../actions/contract-product.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ContractProductsEffect {
  loadContractProductsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractProductsAction),
    switchMap(({ id }) => this.contractProductService.getAll(`${id}`).pipe(
      map((response: IContractProduct[]) => {
        return loadContractProductSuccessAction({ response });
      })
    ))
  ));
  updateContractProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractProductAction),
    switchMap(({ payload }) =>
      this.contractProductService.patch(payload)
        .pipe(
          map((updated: any) => {
            /* reload contract products */
            this.store.dispatch(loadContractProductsAction({ id: payload?.contract?.id }));

            return updateContractProductsSuccessAction({ updated });
          })
        ))
  ));
  addContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProductsAction),
    switchMap(({ payload }) =>
      this.contractProductService.post(payload)
        .pipe(
          map((response: IContractProduct[]) => {
            this.store.dispatch(removeSelectedProductAction());

            return addContractProductsSuccessAction({ response });
          })
        ))
  ));
  deleteContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractProduct),
    switchMap(({ id }) => this.contractProductService.delete(id))),
    { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractProductService: ContractProductService
  ) { }
}
