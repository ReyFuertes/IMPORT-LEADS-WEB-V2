import { addCategoryAction, addCategorySuccessAction, loadCategoryAction, loadCategorySuccessAction, updateCategoryAction, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadContractCategoryAction } from '../actions/contract-category.action';

@Injectable()
export class CategoryEffect {
  loadCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategoryAction),
    switchMap(() => this.categoryService.getAll().pipe(
      map((response: any) => {
        return loadCategorySuccessAction({ response });
      })
    ))
  ));
  updateCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategoryAction),
    switchMap(({ payload, contractCategory }) => {
      return this.categoryService.patch(payload)
        .pipe(
          map((updated: any) => {
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
