import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport } from '../../inspections.models';
import { InspectionReportService } from '../../inspections.service';
import { getInspectorReportAction, getInspectorReportSuccessAction, inspectionBarChartReportAction, inspectionBarChartReportSuccessAction, inspectionProductsReportAction, inspectionProductsReportSuccessAction } from '../actions/inspection-report.action';

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

  inspectionProductsReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(inspectionProductsReportAction),
    switchMap(({ id }) => {
      return this.inspectionReportSrv.getById(id, 'products').pipe(
        map((response: any) => {
          return inspectionProductsReportSuccessAction({ response });
        })
      )
    })
  ));

  inspectionBarChartReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(inspectionBarChartReportAction),
    switchMap(({ id }) => {
      return this.inspectionReportSrv.post({ id }, 'bar-chart').pipe(
        map((response: IInspectionBarReport) => {
          return inspectionBarChartReportSuccessAction({ response });
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