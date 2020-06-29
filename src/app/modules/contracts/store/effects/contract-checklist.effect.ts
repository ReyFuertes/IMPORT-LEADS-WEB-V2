import { clearPreSelectProducts } from './../actions/contract-product.action';
import { ChecklistService } from './../../services/contract-checklist.service';
import { loadChecklist, loadChecklistSuccess, saveToChecklistSuccess, addToChecklist, addToChecklistSuccess, deleteChecklistSuccess, deleteChecklist, selectTerm, removeSelectedTerm } from './../actions/contract-checklist.action';
import { loadContractCategoryAction } from './../actions/contract-category.action';
import { addCategory, addCategorySuccess, updateCategory, updateCategorysSuccess } from './../actions/category.action';
import { CategoryService } from './../../../../services/category.service';
import { AppState } from './../../../../store/app.reducer';
import { ICategory, IContractChecklist, IContractChecklistItem } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { appNotification } from 'src/app/store/notification.action';
import { zip } from 'rxjs';

@Injectable()
export class ChecklistEffect {
  loadChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklist),
    mergeMap(() => this.checklistService.getAll().pipe(
      map((items: IContractChecklistItem[]) => {
        return loadChecklistSuccess({ items });
      })
    ))
  ));

  deleteChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(deleteChecklist),
    mergeMap(({ payload }) => {
      return this.checklistService.post(payload, 'multi-delete')
        .pipe(
          map((deleted: IContractChecklistItem[]) => {
            if (deleted) {
              console.log('%c Checklist created Deleted',
                'background: red; color: #ffffff');
            }

            /* preselect terms base on product selection */
            deleted && Object.values(deleted).forEach(item => {
              this.store.dispatch(removeSelectedTerm({ id: item.id }));
            });

            return deleteChecklistSuccess({ deleted });
          })
        )
    })
  ));

  addChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(addToChecklist),
    mergeMap(({ payload }) => this.checklistService.post(payload)
      .pipe(
        map((items: IContractChecklistItem[]) => {
          if (items) {
            console.log('%c Checklist created succesfully',
              'background: green; color: #ffffff');
          }

          /* preselect terms base on product selection */
          this.store.dispatch(selectTerm({ items }));

          return addToChecklistSuccess({ items });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private checklistService: ChecklistService,
  ) { }
}
