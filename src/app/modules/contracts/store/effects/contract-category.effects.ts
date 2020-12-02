import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { addContractCategoryAction, addContractCategoryActionSuccess, loadContractCategoryAction, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, deleteContractCategoryAction, updateContractCategoryAction, updateContractCategoryActionSuccess, moveUpContractCategoryAction, moveUpContractCategoryActionSuccess, moveDownContractCategoryActionSuccess, moveDownContractCategoryAction } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractCategoryEffect {
  moveDownContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(moveDownContractCategoryAction),
    mergeMap(({ payload }) => this.contractCategorySrv.post(payload, 'down').pipe(
      map((response: any) => {
        return moveDownContractCategoryActionSuccess({ response });
      })
    ))
  ));

  moveUpContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(moveUpContractCategoryAction),
    mergeMap(({ payload }) => this.contractCategorySrv.post(payload, 'up').pipe(
      map((response: any) => {
        return moveUpContractCategoryActionSuccess({ response });
      })
    ))
  ));

  deleteContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractCategoryAction),
    mergeMap(({ id }) => this.contractCategorySrv.delete(id).pipe(
      map((deleted: IContractCategory) => {
        return deleteContractCategoryActionSuccess({ deleted });
      })
    ))
  ));
  loadContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryAction),
    mergeMap(({ id }) => this.contractCategorySrv.getAll(`${id}/contract`).pipe(
      map((items: any[]) => {

        return loadContractCategoryActionSuccess({ items });
      })
    ))
  ));
  addContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategoryAction),
    mergeMap(({ payload }) => this.contractCategorySrv.post(payload)
      .pipe(
        tap((created) => {
          if (created)
            this.store.dispatch(appNotification({
              notification: { success: true, message: 'Category successfully Saved' }
            }))
        }),
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
