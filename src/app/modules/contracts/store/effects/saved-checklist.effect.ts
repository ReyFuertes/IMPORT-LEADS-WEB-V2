import { AppState } from './../../../../store/app.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SavedChecklistService } from '../../services/saved-checklist';
import { saveChecklistAction, saveChecklistSuccessAction, loadChecklistSuccessAction, loadChecklistAction } from '../actions/saved-checklist.action';
import { ISavedChecklist } from '../../contract.model';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class SavedChecklistEffect {
  loadChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklistAction),
    mergeMap(() => {
      return this.savedChecklistSrv.getAll()
        .pipe(
          map((items: ISavedChecklist[]) => {
            return loadChecklistSuccessAction({ items });
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
          map((created: ISavedChecklist) => {
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
