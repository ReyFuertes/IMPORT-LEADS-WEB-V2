import { loadContractCategoryAction } from './../actions/contract-category.action';
import { addCategoryAction, addCategorySuccess, updateCategoryAction, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class CategoryEffect {
  updateCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategoryAction),
    mergeMap(({ payload }) => {
      return this.categoryService.patch(payload)
        .pipe(
          map((updated: any) => {
            return updateCategorysSuccess({ updated });
          })
        )
    })
  ));
  addCategoryAction$ = createEffect(() => this.actions$.pipe(
    ofType(addCategoryAction),
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
