import { ChecklistService } from './../../services/contract-checklist.service';
import { loadChecklist, loadChecklistSuccess, addToChecklist, addToChecklistSuccess, deleteChecklistItemSuccess, deleteChecklistItem, addTermToChecklistAction, overrideChecklistItemAction, overrideChecklistItemActionSuccess, removeSelectedTerms } from './../actions/contract-checklist.action';
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
          tap((deleted: IContractChecklistItem[]) =>
            /* preselect terms base on product selection */
            this.store.dispatch(removeSelectedTerms({ ids: deleted.map(t => t.checklist_term.id) }))),
          tap((deleted: IContractChecklistItem[]) => {
            if (deleted) {
              console.log('%c Checklist created Deleted',
                'background: red; color: #ffffff');
            }
          }),
          map((deleted: IContractChecklistItem[]) => {
            return deleteChecklistItemSuccess({ deleted });
          })
        )
    })
  ));

  addChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(addToChecklist),
    mergeMap(({ payload }) => this.checklistService.post(payload)
      .pipe(
        /* when adding checklist item also preselect terms */
        tap((items: IContractChecklistItem[]) =>
          this.store.dispatch(addTermToChecklistAction({ items: items.map(i => i.checklist_term.id) }))),
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
