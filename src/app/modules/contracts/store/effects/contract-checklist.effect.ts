import { clearPreSelectProducts } from './../actions/contract-product.action';
import { ChecklistService } from './../../services/contract-checklist.service';
import { saveToChecklist, saveToChecklistSuccess } from './../actions/contract-checklist.action';
import { loadContractCategory } from './../actions/contract-category.action';
import { addCategory, addCategorySuccess, updateCategory, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory, IContractChecklist } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { appNotification } from 'src/app/store/notification.action';

@Injectable()
export class ChecklistEffect {
  saveToChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(saveToChecklist),
    mergeMap(({ payload }) => this.checklistService.post(payload)
      .pipe(
        map((payload: IContractChecklist[]) => {
          if (payload) {
            this.store.dispatch(appNotification({
              notification:
                { success: true, message: 'Checklist successfully Created' }
            }));
          }
          return saveToChecklistSuccess({ payload });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private checklistService: ChecklistService,
  ) { }
}
