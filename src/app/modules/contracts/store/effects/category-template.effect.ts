import { AppState } from 'src/app/store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CategoryTemplateService } from '../../services/category-template.service';
import { saveCategoryTemplateAction, saveCategoryTemplateSuccessAction, loadCategoryTemplatesAction, loadCategoryTemplatesSuccessAction } from '../actions/Category-template.action';
import { ICategoryTemplate } from '../../contract.model';

@Injectable()
export class CategoryTemplateEffect {
  loadCategoryTemplatesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadCategoryTemplatesAction),
    switchMap(() => this.CategoryTemplateSrv.getAll().pipe(
      map((response: any) => {
        return loadCategoryTemplatesSuccessAction({ response });
      })
    ))
  ));

  saveCategoryTemplateAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveCategoryTemplateAction),
    switchMap(({ payload }) => this.CategoryTemplateSrv.post(payload).pipe(
      map((response: ICategoryTemplate) => {
        return saveCategoryTemplateSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private CategoryTemplateSrv: CategoryTemplateService
  ) { }
}
