import { AppState } from './../../../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SavedChecklistService } from '../../services/saved-checklist';
import { saveChecklistAction, saveChecklistSuccessAction, loadSavedChecklistAction, loadSavedChecklistSuccessAction, getSavedChecklistByIdAction, getSavedChecklistByIdSuccessAction } from '../actions/saved-checklist.action';
import { ISavedChecklistItem, ISavedChecklistResponse } from '../../contract.model';
import { clearAllSelectedTerms, clearChecklistProductsAction, clearChecklistSourceAction, clearEntitiesAction } from '../actions/contract-checklist.action';

@Injectable()
export class SavedChecklistEffect {
  getSavedChecklistByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getSavedChecklistByIdAction),
    switchMap(({ id }) => this.savedChecklistSrv.getAll(`${id}`).pipe(
      map((response: any) => {
        return getSavedChecklistByIdSuccessAction({ response });
      })
    ))
  ));
  loadSavedChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    switchMap(({ param }) => {
      return this.savedChecklistSrv.getAll(param)
        .pipe(
          map((items: ISavedChecklistItem[]) => {
            return loadSavedChecklistSuccessAction({ items });
          })
        )
    })
  ));
  saveChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveChecklistAction),
    switchMap(({ payload }) => {
      return this.savedChecklistSrv.post(payload)
        .pipe(
          map((created: ISavedChecklistItem) => {
            /* clear checklist after saved */
            this.store.dispatch(clearChecklistProductsAction());
            this.store.dispatch(clearChecklistSourceAction());
            this.store.dispatch(clearAllSelectedTerms());
            this.store.dispatch(clearEntitiesAction());

            return saveChecklistSuccessAction({ created });
          })
        )
    })
  ));
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private savedChecklistSrv: SavedChecklistService,
  ) { }
}
