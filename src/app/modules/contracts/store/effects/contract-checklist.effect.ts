import { ChecklistService } from './../../services/contract-checklist.service';
import { loadChecklistAction, loadChecklistSuccessAction, addToChecklistAction, addToChecklistSuccessAction, removeChecklistItemsSuccessAction, removeChecklistItemsAction, addTermToChecklistAction, overrideChecklistItemAction, overrideChecklistItemActionSuccess, removeSelectedTermsAction } from './../actions/contract-checklist.action';
import { AppState } from './../../../../store/app.reducer';
import { IContractChecklistItem, IContractTerm } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Injectable()
export class ChecklistEffect {
  overrideChecklistItemAction$ = createEffect(() => this.actions$.pipe(
    ofType(overrideChecklistItemAction),
    mergeMap(({ item }) => {
      return this.checklistService.post(item, 'override')
        .pipe(
          map((items: IContractChecklistItem[]) => {
            return overrideChecklistItemActionSuccess({ items });
          })
        )
    })
  ));
  loadChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklistAction),
    mergeMap(() => this.checklistService.getAll().pipe(
      map((items: IContractChecklistItem[]) => {
        return loadChecklistSuccessAction({ items });
      })
    ))
  ));
  removeChecklistItemsAction$ = createEffect(() => this.actions$.pipe(
    ofType(removeChecklistItemsAction),
    mergeMap(({ payload }) => {
      return this.checklistService.post(payload, 'multi-delete')
        .pipe(
          tap((deleted: IContractChecklistItem[]) => {
            /* preselect terms base on product selection */
            this.store.dispatch(removeSelectedTermsAction({ ids: deleted.map(t => t.checklist_term.id) }));
          }),
          map((deleted: IContractChecklistItem[]) => {
            return removeChecklistItemsSuccessAction({ deleted });
          })
        )
    })
  ));
  addToChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(addToChecklistAction),
    mergeMap(({ payload }) => this.checklistService.post(payload)
      .pipe(
        /* when adding checklist item also preselect terms */
        tap((item: IContractChecklistItem) => {
          this.store.dispatch(addTermToChecklistAction({ ids: [item.checklist_term.id] }))
        }),
        map((item: IContractChecklistItem) => {
          return addToChecklistSuccessAction({ item });
        })
      ))
  ));
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private checklistService: ChecklistService,
  ) { }
}
