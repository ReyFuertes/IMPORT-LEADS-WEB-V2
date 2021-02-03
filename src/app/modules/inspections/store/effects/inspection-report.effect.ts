import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport } from '../../inspections.models';
import { InspectionReportService } from '../../inspections.service';
import { getInspectorReportAction, getInspectorReportSuccessAction, inspectionBarReportAction, inspectionBarReportSuccessAction, inspectionProductReportAction, inspectionProductReportSuccessAction } from '../actions/inspection-report.action';

@Injectable()
export class InspectionReportEffect {
  getInspectorReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInspectorReportAction),
    switchMap(({ id }) => {
      return this.inspectionReportSrv.getById(id, 'inspector').pipe(
        map((response: any) => {
          return getInspectorReportSuccessAction({ response });
        })
      )
    })
  ));

  inspectionProductReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(inspectionProductReportAction),
    switchMap(({ id }) => {
      return this.inspectionReportSrv.post({ id }, 'products').pipe(
        map((response: IInspectionBarReport) => {
          return inspectionProductReportSuccessAction({ response });
        })
      )
    })
  ));

  inspectionBarReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(inspectionBarReportAction),
    switchMap(({ id }) => {
      return this.inspectionReportSrv.getById(id).pipe(
        map((response: any) => {
          return inspectionBarReportSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private inspectionReportSrv: InspectionReportService,
  ) { }
}