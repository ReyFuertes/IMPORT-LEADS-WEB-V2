import { IInspectionChecklist, IInspectionRun } from './../../inspections.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { InspectionChecklistService } from '../../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';
import { deleteInsChecklistAction, getInsChecklistAction, getInsChecklistSuccessAction, saveInsChecklistAction, saveInsChecklistSuccessAction, updateInsChecklistAction, updateInsChecklistSuccessAction } from '../../store/actions/inspection-checklist.action';
import { loadInspectionRunAction } from '../actions/inspection.action';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class InspectionChecklistEffect {
  updateInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateInsChecklistAction),
    mergeMap(({ payload }) => {
      return this.insChecklistSrv.patch(payload).pipe(
        tap((response: IInspectionChecklist) => {
          if (response && response?.inspection_run) {
            this.store.dispatch(loadInspectionRunAction({ id: response?.inspection_run?.id }));
          };

          this.store.dispatch(appNotification({
            notification: { success: true, message: 'Successfully updated a comment' }
          }))
        }),
        map((response: IInspectionChecklist) => {
          return updateInsChecklistSuccessAction({ response });
        })
      )
    })
  ));
  deleteInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteInsChecklistAction),
    switchMap(({ id }) => this.insChecklistSrv.delete(id)),
    tap(() => {
      this.store.dispatch(appNotification({
        notification: { success: true, message: 'You cant need to selecting a product' }
      }))
    })
  ), { dispatch: false })

  getInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInsChecklistAction),
    mergeMap(({ id }) => {
      return this.insChecklistSrv.getById(id)
        .pipe(
          map((response: IInspectionChecklist) => {
            return getInsChecklistSuccessAction({ response });
          })
        )
    })
  ))
  saveInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveInsChecklistAction),
    mergeMap(({ payload }) => {
      return this.insChecklistSrv.post(payload).pipe(
        tap((response: IInspectionChecklist) => {
          if (response && response?.inspection_run) {
            this.store.dispatch(loadInspectionRunAction({ id: response?.inspection_run?.id }));
          };

          this.store.dispatch(appNotification({
            notification: { success: true, message: 'Successfully added a comment' }
          }))
        }),
        map((response: IInspectionChecklist) => {
          return saveInsChecklistSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private insChecklistSrv: InspectionChecklistService
  ) { }
}
