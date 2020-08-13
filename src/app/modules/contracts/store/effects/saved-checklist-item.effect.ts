import { loadContractCategoryAction } from './../actions/contract-category.action';
import { addCategoryAction, addCategorySuccess, updateCategoryAction, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory, ISavedChecklistItem } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { saveChecklistItemAction, saveChecklistItemSuccessAction } from '../actions/saved-checklist-item.action';
import { SavedChecklistItemService } from '../../services/saved-checklist-item';

@Injectable()
export class SavedChecklistItemEffect {
  saveChecklistItemAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveChecklistItemAction),
    mergeMap(({ payload }) => {
      return this.savedChecklistItemSrv.post(payload)
        .pipe(
          map((created: ISavedChecklistItem) => {
            return saveChecklistItemSuccessAction({ created });
          })
        )
    })
  ))

  constructor(
    private actions$: Actions,
    private savedChecklistItemSrv: SavedChecklistItemService,
  ) { }
}
