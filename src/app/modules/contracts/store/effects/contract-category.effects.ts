import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { addContractCategoryAction, addContractCategoryActionSuccess, loadContractCategoryAction, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, deleteContractCategoryAction, moveUpContractCategoryAction, moveUpContractCategoryActionSuccess, moveDownContractCategoryActionSuccess, moveDownContractCategoryAction, loadAllContractCategoryAction, loadAllContractCategoryActionSuccess, addMultipleContractCategoryAction, addMultipleContractCategoryActionSuccess, importIntoContractCategoryAction, deleteCategoryErrorAction } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { appNotificationAction } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractCategoryEffect {
  importIntoContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(importIntoContractCategoryAction),
    switchMap(({ payload, contract }) => this.contractCategoryService.post(payload, 'import-into')
      .pipe(
        map((created: any) => {
          this.store.dispatch(loadContractCategoryAction({ id: contract?.id }));

          return addMultipleContractCategoryActionSuccess({ created });
        })
      ))
  ));

  addMultipleContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addMultipleContractCategoryAction),
    switchMap(({ payload, contract }) => this.contractCategoryService.post(payload, 'multiple')
      .pipe(
        map((created: any) => {
          this.store.dispatch(loadContractCategoryAction({ id: contract?.id }));

          return addMultipleContractCategoryActionSuccess({ created });
        })
      ))
  ));

  loadAllContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllContractCategoryAction),
    switchMap(() => this.contractCategoryService.getAll().pipe(
      map((response: any) => {
        return loadAllContractCategoryActionSuccess({ response });
      })
    ))
  ));

  moveDownContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(moveDownContractCategoryAction),
    switchMap(({ payload }) => this.contractCategoryService.post(payload, 'down').pipe(
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
    switchMap(({ payload }) => this.contractCategoryService.post(payload, 'up').pipe(
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
    switchMap(({ id, contractId }) => this.contractCategoryService.delete(id).pipe(
      map((deleted: IContractCategory) => {
        return deleteContractCategoryActionSuccess({ deleted });
      }),
      finalize(() => {
        this.store.dispatch(loadContractCategoryAction({ id: contractId }));
      }),
      catchError(({ error }) => {
        this.store.dispatch(appNotificationAction({ notification: { error: true, message: error?.message } }));

        return of(deleteCategoryErrorAction({ error: error?.message }))
      })
    ))
  ));
      
  loadContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryAction),
    switchMap(({ id }) => this.contractCategoryService.getAll(`${id}/contract`).pipe(
      map((items: any[]) => {
        return loadContractCategoryActionSuccess({ items });
      })
    ))
  ));

  addContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategoryAction),
    switchMap(({ payload }) => this.contractCategoryService.post(payload)
      .pipe(
        map((created: IContractCategory) => {
          return addContractCategoryActionSuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractCategoryService: ContractCategoryService,
  ) { }
}
