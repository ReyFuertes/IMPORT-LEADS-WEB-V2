import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport } from '../../inspections.models';
import { InspectionReportService } from '../../inspections.service';
import { inspectionOkCommentsReport, getInspectionOkCommentReportSuccessAction, getInspectorReportAction, getInspectorReportSuccessAction, inspectionBarChartReportAction, inspectionBarChartReportSuccessAction, inspectionProductsReportAction, inspectionProductsReportSuccessAction, getInspectionFailedCommentsReportAction, getInspectionFailedCommentReportSuccessAction, getTagsReportAction, getTagsReportSuccessAction, downloadProductionImagesAction, downloadProductionImagesSuccessAction } from '../actions/inspection-report.action';
import { environment } from 'src/environments/environment';

@Injectable()
export class InspectionReportEffect {
  downloadProductionImagesAction$ = createEffect(() => this.actions$.pipe(
    ofType(downloadProductionImagesAction),
    switchMap(({ saved_checklist_id }) => {
      return this.inspectionReportSrv.getBinaryById(saved_checklist_id, 'download-production-images').pipe(
        map((response: any) => {

          window.open(environment.apiDownloadsPath + response?.link);

          return downloadProductionImagesSuccessAction({ response });
        })
      )
    })
  ));

  getTagsReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(getTagsReportAction),
    switchMap(({ saved_checklist_id }) => {
      return this.inspectionReportSrv.getById(saved_checklist_id, 'tags').pipe(
        map((response: any) => {
          return getTagsReportSuccessAction({ response });
        })
      )
    })
  ));

  getInspectionFailedCommentsReportAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInspectionFailedCommentsReportAction),
    switchMap(({ saved_checklist_id }) => {
      return this.inspectionReportSrv.getById(saved_checklist_id, 'comment/failed').pipe(
        map((response: any) => {
          return getInspectionFailedCommentReportSuccessAction({ response });
        })
      )
    })
  ));

  inspectionOkCommentsReport$ = createEffect(() => this.actions$.pipe(
    ofType(inspectionOkCommentsReport),
    switchMap(({ saved_checklist_id }) => {
      return this.inspectionReportSrv.getById(saved_checklist_id, 'comment/ok').pipe(
        map((response: any) => {
          return getInspectionOkCommentReportSuccessAction({ response });
        })
      )
    })
  ));

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
    switchMap((payload) => {
      return this.inspectionReportSrv.post(payload, 'bar-chart').pipe(
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