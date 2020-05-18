import { loadContractCategory } from './../actions/contract-category.action';
import { addCategory, addCategorySuccess, updateCategory, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoryEffects {
  updateCategory$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategory),
    mergeMap(({ payload }) => {
      return this.categoryService.patch(payload)
        .pipe(
          map((updated: any) => {
            return updateCategorysSuccess({ updated });
          })
        )
    })
  ));

  addCategory$ = createEffect(() => this.actions$.pipe(
    ofType(addCategory),
    mergeMap(({ payload }) => this.categoryService.post(payload)
      .pipe(
        map((created: ICategory) => {
          return addCategorySuccess({ created });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) { }
}
