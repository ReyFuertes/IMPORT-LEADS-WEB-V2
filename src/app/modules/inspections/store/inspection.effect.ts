import { IActiveInspection, IInspectionChecklist } from './../inspections.models';
import { loadInspectionChecklistSuccessAction, runInspectionAction, runInspectionSuccessAction, createInspectionChecklistAction, createInspectionChecklistSuccessAction } from './inspection.action';
import { ChecklistService } from './../../contracts/services/contract-checklist.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../contracts/store/actions/saved-checklist.action';
import { InspectionsService, InspectionRunService, InspectionChecklistService } from '../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../contracts/store/reducers';

@Injectable()
export class InspectionEffect {
  createInspectionChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(createInspectionChecklistAction),
    mergeMap(({ payload }) => {
      return this.inspectionChecklistSrv.post(payload).pipe(
        tap((response: IInspectionChecklist) => {
          if (response)
            this.router.navigateByUrl(`/dashboard/inspections/${response?.inspection_run?.id}/run`);
        }),
        map((response: IInspectionChecklist) => {
          return createInspectionChecklistSuccessAction({ response });
        })
      )
    })
  ));
  runInspectionAction$ = createEffect(() => this.actions$.pipe(
    ofType(runInspectionAction),
    mergeMap(({ run }) => {
      return this.inspectionRunSrv.post(run)
        .pipe(
          tap(({ id }: any) => {
            if (id) {
              /* create an inspection checklist */
              this.store.dispatch(createInspectionChecklistAction({
                payload: {
                  inspection_run: { id }
                }
              }))
            }
          }),
          map((response: IActiveInspection[]) => {
            return runInspectionSuccessAction({ response });
          })
        )
    })
  ));
  loadSavedChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    mergeMap(() => {
      return this.inspectionSrv.getAll()
        .pipe(
          map((response: IActiveInspection[]) => {
            return loadInspectionChecklistSuccessAction({ response });
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
