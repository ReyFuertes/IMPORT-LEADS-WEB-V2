import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { addContractCategoryAction, addContractCategoryActionSuccess, loadContractCategoryAction, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, deleteContractCategoryAction, updateContractCategoryAction, updateContractCategoryActionSuccess } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractCategoryEffect {
  deleteContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractCategoryAction),
    mergeMap(({ id }) => this.contractCategoryService.delete(id).pipe(
      map((deleted: IContractCategory) => {
        return deleteContractCategoryActionSuccess({ deleted });
      })
    ))
  ));
  loadContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryAction),
    mergeMap(({ id }) => this.contractCategoryService.getById(id, 'contract').pipe(
      map((items: IContractCategory[]) => {
        return loadContractCategoryActionSuccess({ items });
      })
    ))
  ));
  addContractCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategoryAction),
    mergeMap(({ payload }) => this.contractCategoryService.post(payload)
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
    private contractCategoryService: ContractCategoryService,
  ) { }
}
