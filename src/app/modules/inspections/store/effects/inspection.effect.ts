import { IActiveInspection, IInspectionChecklist, IInspectionRun } from './../../inspections.models';
import { loadActiveInspectionSuccessAction, runInspectionAction, runInspectionSuccessAction, createInspectionChecklistAction, createInspectionChecklistSuccessAction, loadInspectionRunAction, loadInspectionRunSuccessAction } from '../actions/inspection.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../../contracts/store/actions/saved-checklist.action';
import { InspectionsService, InspectionRunService, InspectionChecklistService } from '../../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';

@Injectable()
export class InspectionEffect {
  loadInspectionRunAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadInspectionRunAction),
    mergeMap(({ id }) => {
      return this.inspectionRunSrv.getById(id).pipe(
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
            this.router.navigateByUrl(`/dashboard/inspections/${response?.inspection_run?.id}/run`);
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
      return this.inspectionRunSrv.post(payload).pipe(
        tap(({ id }: any) => {
          if (id) {
            this.router.navigateByUrl(`/dashboard/inspections/${id}/run`);
          }
        }),
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
    private inspectionRunSrv: InspectionRunService,
    private inspectionChecklistSrv: InspectionChecklistService
  ) { }
}
