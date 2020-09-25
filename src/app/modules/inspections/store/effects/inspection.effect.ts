import { IActiveInspection, IInspectionChecklist, IInspectionRun, IInspectionRunPayload, RunStatusType } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, runInspectionAction, runInspectionSuccessAction, createInspectionChecklistAction, createInspectionChecklistSuccessAction, loadInspectionRunAction, loadInspectionRunSuccessAction, runNextInspectionAction, runNextInspectionSuccessAction, runPrevInspectionAction, runPrevInspectionSuccessAction, changeInspectionStatusAction, changeInspectionStatusSuccessAction, deleteAndNavigateToAction, deleteAndNavigateToSuccessAction, copyInspectionAction, copyInspectionSuccessAction } from '../actions/inspection.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../../contracts/store/actions/saved-checklist.action';
import { InspectionsService, InspectionChecklistRunService, InspectionChecklistService } from '../../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class InspectionEffect {
  copyInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(copyInspectionAction),
    mergeMap(({ id, copyCount }) => {
      return this.inspectionChecklistRunSrv.post({ id, copyCount }, 'copy').pipe(
        tap(({ id }: any) => {
          debugger
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
        tap((response: IInspectionRunPayload) => {
          /* if run is stop the redirect it run report for results */
          if (response?.run_status == RunStatusType.stop) {
            this.store.dispatch(appNotification({
              notification: { error: true, message: 'Inspection run is stopped, Redirecting you to report page.' }
            }));

            setTimeout(() => this.router.navigateByUrl(`/dashboard/inspections/${response?.id}/report`), 3000);
          }
          else if (response?.run_status == RunStatusType.pause) {
            this.store.dispatch(appNotification({
              notification: { success: true, message: 'Inspection run is paused' }
            }));
          }
        }),
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

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private inspectionSrv: InspectionsService,
    private inspectionChecklistRunSrv: InspectionChecklistRunService,
    private inspectionChecklistSrv: InspectionChecklistService
  ) { }
}
