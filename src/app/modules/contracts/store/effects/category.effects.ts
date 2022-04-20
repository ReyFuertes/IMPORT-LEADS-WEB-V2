import { addCategoryAction, addCategorySuccessAction, deleteCategoryAction, deleteCategoryErrorAction, deleteCategorySuccessAction, loadCategoryAction, loadCategorySuccessAction, updateCategoryAction, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadContractCategoryAction } from '../actions/contract-category.action';
import { appNotificationAction } from 'src/app/store/actions/notification.action';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffect {
  deleteCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCategoryAction),
    switchMap(({ id }) =>
      this.categoryService.delete(id).pipe(
        map((deleted: ICategory) => {
          return deleteCategorySuccessAction({ deleted });
        }),
        finalize(() => {
          this.store.dispatch(loadCategoryAction());
        }),
        catchError(({ error }) => {
          this.store.dispatch(appNotificationAction({ notification: { error: true, message: error?.message } }));
  
          return of(deleteCategoryErrorAction({ error: error?.message }))
        })
      ))
  ));

  loadCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategoryAction),
    switchMap(() => this.categoryService.getAll().pipe(
      map((response: ICategory[]) => {
        return loadCategorySuccessAction({ response });
      })
    ))
  ));

  updateCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategoryAction),
    switchMap(({ payload, contractCategory }) => {
      return this.categoryService.patch(payload)
        .pipe(
          map((updated: ICategory) => {
            return updateCategorysSuccess({ updated });
          }),
          finalize(() => {
            this.store.dispatch(loadContractCategoryAction({ id: contractCategory?.contract?.id }));
          })
        )
    })
  ));
  addCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCategoryAction),
    switchMap(({ payload }) => this.categoryService.post(payload)
      .pipe(
        map((created: ICategory) => {
          return addCategorySuccessAction({ created });
        })
      ))
  ));

  constructor(
    private store: Store,
    private actions$: Actions,
    private categoryService: CategoryService
  ) { }
}
