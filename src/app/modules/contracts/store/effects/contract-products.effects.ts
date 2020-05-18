import { IContractProduct } from './../../contract.model';
import { mergeMap, map } from 'rxjs/operators';
import { ContractProductService } from './../../services/contract-products.service';
import { addContractProducts, addContractProductsSuccess, loadContractProducts, loadContractProductSuccess, deleteContractProduct, updateContractProductsSuccess, updateContractProduct } from './../actions/products.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { zip, of } from 'rxjs';

@Injectable()
export class ContractProductsEffects {
  loadContractProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractProducts),
    mergeMap(({ id }) => this.contractProductService.getById(id).pipe(
      map((items: IContractProduct[]) => {
        return loadContractProductSuccess({ items });
      })
    ))
  ));

  updateContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractProduct),
    mergeMap(({ payload }) =>
      this.contractProductService.patch(payload)
        .pipe(
          map((updated: any) => {
            return updateContractProductsSuccess({ updated });
          })
        ))
  ));

  addContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(addContractProducts),
    mergeMap(({ payload }) =>
      this.contractProductService.post(payload)
        .pipe(
          map((created: any) => {
            return addContractProductsSuccess({ created });
          })
        ))
  ));

  deleteContractProduct$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractProduct),
    mergeMap(({ id }) =>
      this.contractProductService.delete(id)
    )), { dispatch: false });

  constructor(
    private actions$: Actions,
    private contractProductService: ContractProductService
  ) { }
}
