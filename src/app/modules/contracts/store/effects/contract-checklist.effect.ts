import { ChecklistService } from './../../services/contract-checklist.service';
import { loadChecklist, loadChecklistSuccess, addToChecklist, addToChecklistSuccess, deleteChecklistItemSuccess, deleteChecklistItem, addTermToChecklistAction, removeSelectedTerm, overrideChecklistItemAction, overrideChecklistItemActionSuccess, removeChecklistItemAction, addToChecklistSourceAction } from './../actions/contract-checklist.action';
import { AppState } from './../../../../store/app.reducer';
import { IContractChecklistItem } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getChecklistSourceSelector } from '../selectors/contract-checklist.selector';

@Injectable()
export class ChecklistEffect {
  overrideChecklistItemAction$ = createEffect(() => this.actions$.pipe(
    ofType(overrideChecklistItemAction),
    mergeMap(({ item }) => {
      return this.checklistService.post(item, 'override')
        .pipe(
          map((item: IContractChecklistItem) => {
            return overrideChecklistItemActionSuccess({ item });
          })
        )
    })
  ));

  loadChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklist),
    mergeMap(() => this.checklistService.getAll().pipe(
      map((items: IContractChecklistItem[]) => {
        return loadChecklistSuccess({ items });
      })
    ))
  ));

  deleteChecklistItem$ = createEffect(() => this.actions$.pipe(
    ofType(deleteChecklistItem),
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
            return deleteChecklistItemSuccess({ deleted });
          })
        )
    })
  ));

  addChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(addToChecklist),
    mergeMap(({ payload }) => this.checklistService.post(payload)
      .pipe(
        /* preselect terms base on product selection */
        tap((items: IContractChecklistItem[]) => this.store.dispatch(addTermToChecklistAction({ items }))),
        map((items: IContractChecklistItem[]) => {
          if (items) {
            console.log('%c Checklist created succesfully',
              'background: green; color: #ffffff');
          }
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
