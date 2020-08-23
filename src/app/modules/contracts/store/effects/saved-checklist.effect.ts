import { AppState } from './../../../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SavedChecklistService } from '../../services/saved-checklist';
import { saveChecklistAction, saveChecklistSuccessAction, loadSavedChecklistAction, loadSavedChecklistSuccessAction, getSavedChecklistByIdAction, getSavedChecklistByIdSuccessAction } from '../actions/saved-checklist.action';
import { ISavedChecklistItem, ISavedChecklistResponse } from '../../contract.model';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class SavedChecklistEffect {
  getSavedChecklistByIdAction$ = createEffect(() => this.actions$.pipe(
    ofType(getSavedChecklistByIdAction),
    mergeMap(({ id }) => this.savedChecklistSrv.getById(id).pipe(
      map((response: ISavedChecklistResponse[]) => {
        return getSavedChecklistByIdSuccessAction({ response });
      })
    ))
  ));
  loadChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    mergeMap(() => {
      return this.savedChecklistSrv.getAll()
        .pipe(
          map((items: ISavedChecklistItem[]) => {
            return loadSavedChecklistSuccessAction({ items });
          })
        )
    })
  ))
  saveChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveChecklistAction),
    mergeMap(({ payload }) => {
      return this.savedChecklistSrv.post(payload)
        .pipe(
          tap(created => {
            if (created)
              this.store.dispatch(appNotification({
                notification: { success: true, message: 'Checklist successfully Saved' }
              }));
          }),
          map((created: ISavedChecklistItem) => {
            return saveChecklistSuccessAction({ created });
          })
        )
    })
  ))
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private savedChecklistSrv: SavedChecklistService,
  ) { }
}
