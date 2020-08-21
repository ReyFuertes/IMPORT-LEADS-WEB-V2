import { ChecklistService } from './../../services/contract-checklist.service';
import { loadChecklistAction, loadChecklistSuccessAction, getSavedChecklistByIdAction, getSavedChecklistByIdSuccessAction } from './../actions/contract-checklist.action';
import { AppState } from './../../../../store/app.reducer';
import { IContractChecklistItem, IContractTerm } from './../../contract.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SavedChecklistService } from '../../services/saved-checklist';

@Injectable()
export class ChecklistEffect {
  getSavedChecklistByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getSavedChecklistByIdAction),
    mergeMap(({ id }) => this.savedChecklistService.getById(id).pipe(
      map((response: IContractChecklistItem[]) => {
        debugger
        return getSavedChecklistByIdSuccessAction({ response });
      })
    ))
  ));
  loadChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklistAction),
    mergeMap(() => this.checklistService.getAll().pipe(
      map((items: IContractChecklistItem[]) => {
        return loadChecklistSuccessAction({ items });
      })
    ))
  ));
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private checklistService: ChecklistService,
    private savedChecklistService: SavedChecklistService,
  ) { }
}
