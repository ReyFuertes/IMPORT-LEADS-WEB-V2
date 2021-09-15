import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { addContractCategoryAction, addContractCategoryActionSuccess, loadContractCategoryAction, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, deleteContractCategoryAction, moveUpContractCategoryAction, moveUpContractCategoryActionSuccess, moveDownContractCategoryActionSuccess, moveDownContractCategoryAction, loadAllContractCategoryAction, loadAllContractCategoryActionSuccess, addMultipleContractCategoryAction, addMultipleContractCategoryActionSuccess } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class ContractCategoryEffect {
  addMultipleContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addMultipleContractCategoryAction),
    switchMap(({ payload, contract }) => this.contractCategorySrv.post(payload, 'multiple')
      .pipe(
        map((created: any) => {
          this.store.dispatch(loadContractCategoryAction({ id: contract?.id }));

          return addMultipleContractCategoryActionSuccess({ created });
        })
      ))
  ));

  loadAllContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllContractCategoryAction),
    switchMap(() => this.contractCategorySrv.getAll().pipe(
      map((response: any) => {
        return loadAllContractCategoryActionSuccess({ response });
      })
    ))
  ));

  moveDownContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(moveDownContractCategoryAction),
    switchMap(({ payload }) => this.contractCategorySrv.post(payload, 'down').pipe(
      tap(() => {
        this.store.dispatch(loadContractCategoryAction({ id: payload.contract.id }));
      }),
      map((response: any) => {
        return moveDownContractCategoryActionSuccess({ response });
      })
    ))
  ));

  moveUpContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(moveUpContractCategoryAction),
    switchMap(({ payload }) => this.contractCategorySrv.post(payload, 'up').pipe(
      tap(() => {
        this.store.dispatch(loadContractCategoryAction({ id: payload.contract.id }));
      }),
      map((response: any) => {
        return moveUpContractCategoryActionSuccess({ response });
      })
    ))
  ));

  deleteContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractCategoryAction),
    switchMap(({ id }) => this.contractCategorySrv.delete(id).pipe(
      map((deleted: IContractCategory) => {
        return deleteContractCategoryActionSuccess({ deleted });
      })
    ))
  ));
  loadContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryAction),
    switchMap(({ id }) => this.contractCategorySrv.getAll(`${id}/contract`).pipe(
      map((items: any[]) => {
        return loadContractCategoryActionSuccess({ items });
      })
    ))
  ));
  addContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategoryAction),
    switchMap(({ payload }) => this.contractCategorySrv.post(payload)
      .pipe(
        map((created: IContractCategory) => {
          return addContractCategoryActionSuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractCategorySrv: ContractCategoryService,
  ) { }
}
