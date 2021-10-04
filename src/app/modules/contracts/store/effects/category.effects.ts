import { addCategoryAction, addCategorySuccess, updateCategoryAction, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadContractCategoryAction } from '../actions/contract-category.action';

@Injectable()
export class CategoryEffect {
  updateCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategoryAction),
    switchMap(({ payload, contractCategory }) => {
      return this.categoryService.patch(payload)
        .pipe(
          map((updated: any) => {

            /* just refresh all contract categories, may not be idea but temporary solution */
            this.store.dispatch(loadContractCategoryAction({ id: contractCategory?.contract?.id }))

            return updateCategorysSuccess({ updated });
          })
        )
    })
  ));
  addCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCategoryAction),
    switchMap(({ payload }) => this.categoryService.post(payload)
      .pipe(
        map((created: ICategory) => {
          return addCategorySuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store,
    private actions$: Actions,
    private categoryService: CategoryService,
  ) { }
}
