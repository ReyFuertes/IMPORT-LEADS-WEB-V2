import { IActiveInspection, IInspectionChecklist, IInspectionRun, IInspectionRunPayload, RunStatusType } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, runInspectionAction, runInspectionSuccessAction, createInspectionChecklistAction, createInspectionChecklistSuccessAction, loadInspectionRunAction, loadInspectionRunSuccessAction, runNextInspectionAction, runNextInspectionSuccessAction, runPrevInspectionAction, runPrevInspectionSuccessAction, changeInspectionStatusAction, changeInspectionStatusSuccessAction, deleteAndNavigateToAction, deleteAndNavigateToSuccessAction, copyInspectionAction, copyInspectionSuccessAction, navigateToInspectionAction, navigateToInspectionSuccessAction, navigateToFailed, deleteInspectionAction, deleteInspectionSuccessAction } from '../actions/inspection.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../../contracts/store/actions/saved-checklist.action';
import { InspectionsService, InspectionChecklistRunService, InspectionChecklistService } from '../../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loginFailedAction } from 'src/app/modules/auth/store/auth.action';
import { of } from 'rxjs';
import { SavedChecklistService } from 'src/app/modules/contracts/services/saved-checklist';

@Injectable()
export class InspectionEffect {
  navigateToInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(navigateToInspectionAction),
    mergeMap(({ saved_checklist_id, position }) => {
      return this.inspectionChecklistRunSrv.post({ saved_checklist_id, position }, 'navigate-to').pipe(
        tap(({ id }: any) => {
          this.router.navigateByUrl(`dashboard/inspections/${id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id }));
        }),
        map((response: any) => {
          return navigateToInspectionSuccessAction({ response });
        }),
        catchError(() => {
          return of(appNotification({
            notification: { error: true, message: 'Position doesnt exist..' }
          }));
        })
      )
    })
  ));

  copyInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(copyInspectionAction),
    mergeMap(({ id, copyCount, contractProductId }) => {
      debugger
      return this.inspectionChecklistRunSrv.post({ id, copyCount, contractProductId }, 'copy').pipe(
        tap(({ id }: any) => {
          this.router.navigateByUrl(`dashboard/inspections/${id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id }));
        }),
        map((response: any) => {
          return copyInspectionSuccessAction({ response });
        })
      )
    })
  ));
  deleteAndNavigateToAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAndNavigateToAction),
    mergeMap(({ id }) => {
      return this.inspectionChecklistRunSrv.post({ id }, 'remove-navigate-to').pipe(
        tap(({ id }: any) => {
          this.router.navigateByUrl(`dashboard/inspections/${id}/run`);
          this.store.dispatch(loadInspectionRunAction({ id }));
        }),
        map((response: any) => {
          return deleteAndNavigateToSuccessAction({ response });
        })
      )
    })
  ));

  changeInspectionStatusAction$ = createEffect(() => this.actions$.pipe(
    ofType(changeInspectionStatusAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'status').pipe(
        tap((response: IInspectionRunPayload) => this.store.dispatch(loadInspectionRunAction({ id: response?.id }))),
        map((response: any) => changeInspectionStatusSuccessAction({ response }))
      )
    })
  ));
  runPrevInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runPrevInspectionAction),
    mergeMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'prev').pipe(
        tap(({ id }: any) => {
          if (id) this.router.navigateByUrl(`/dashboard/inspections/${id}/run`);
        }),
        tap(({ id }) => this.store.dispatch(loadInspectionRunAction({ id }))),
        map((response: any) => runPrevInspectionSuccessAction({ response }))
      )
    })
  ));
  runNextInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runNextInspectionAction),
    mergeMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'next').pipe(
        tap(({ id }: any) => {
          if (id) this.router.navigateByUrl(`/dashboard/inspections/${id}/run`);
        }),
        tap(({ id }) => this.store.dispatch(loadInspectionRunAction({ id }))),
        map((response: any) => runNextInspectionSuccessAction({ response }))
      )
    })
  ));

  loadInspectionRunAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadInspectionRunAction),
    mergeMap(({ id }) => {
      return this.inspectionChecklistRunSrv.getById(id).pipe(
        map((response: IInspectionRun) => {
          return loadInspectionRunSuccessAction({ response });
        })
      )
    })
  ))
  createInspectionChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(createInspectionChecklistAction),
    mergeMap(({ payload }) => {
      return this.inspectionChecklistSrv.post(payload).pipe(
        tap((response: IInspectionChecklist) => {
          if (response) {
            this.router.navigateByUrl(`/dashboard/inspections/${response?.inspection_checklist_run?.id}/run`);
          }
        }),
        map((response: IInspectionChecklist) => {
          return createInspectionChecklistSuccessAction({ response });
        })
      )
    })
  ));
  runInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runInspectionAction),
    mergeMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload).pipe(
        tap(({ id }: any) => {
          if (id)
            this.router.navigateByUrl(`/dashboard/inspections/${id}/run`);
        }),
        tap(({ id }) => this.store.dispatch(loadInspectionRunAction({ id }))),
        map((response: IActiveInspection[]) => runInspectionSuccessAction({ response }))
      )
    })
  ));
  loadSavedChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    mergeMap(() => {
      return this.inspectionSrv.getAll()
        .pipe(
          map((response: IActiveInspection[]) => {
            return loadActiveInspectionSuccessAction({ response });
          })
        )
    })
  ))

  deleteInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteInspectionAction),
    mergeMap(({ id }) => {
      return this.savedChecklistSrv.delete(id)
        .pipe(
          tap(() => this.store.dispatch(loadSavedChecklistAction())),
          map((response: IActiveInspection[]) => {
            return deleteInspectionSuccessAction({ response });
          })
        )
    })
  ))

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private inspectionSrv: InspectionsService,
    private inspectionChecklistRunSrv: InspectionChecklistRunService,
    private inspectionChecklistSrv: InspectionChecklistService,
    private savedChecklistSrv: SavedChecklistService
  ) { }
}
