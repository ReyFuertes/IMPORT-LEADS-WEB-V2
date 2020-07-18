import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { addContractCategoryAction, addContractCategoryActionSuccess, loadContractCategoryAction, loadContractCategoryActionSuccess, deleteContractCategoryActionSuccess, deleteContractCategoryAction, updateContractCategoryAction, updateContractCategoryActionSuccess } from './../actions/contract-category.action';
import { ContractCategoryService } from './../../services/contract-category.service';
import { IContractCategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractCategoryEffect {
  delete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractCategoryAction),
    mergeMap(({ id }) => this.contractCategoryService.delete(id).pipe(
      map((deleted: IContractCategory) => {
        return deleteContractCategoryActionSuccess({ deleted });
      })
    ))
  ));

  load$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractCategoryAction),
    mergeMap(({ id }) => this.contractCategoryService.getById(id, 'contract').pipe(
      map((items: IContractCategory[]) => {
        return loadContractCategoryActionSuccess({ items });
      })
    ))
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(addContractCategoryAction),
    mergeMap(({ payload }) => this.contractCategoryService.post(payload)
      .pipe(
        map((created: IContractCategory) => {
          if (created)
            this.store.dispatch(appNotification({ notification: { success: true, message: 'Category successfully Saved' } }));

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
