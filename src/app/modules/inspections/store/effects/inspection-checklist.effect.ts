import { IInspectionChecklistImage } from './../../inspections.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { InspectionChecklistCommentService, InspectionChecklistImageService, InspectionChecklistRunService } from '../../inspections.service';
import { AppState } from '../../../contracts/store/reducers';
import { deleteInsChecklistAction, getInsChecklistAction, getInsChecklistSuccessAction, saveInsChecklisImageAction, saveInsChecklisImageSuccessAction, saveInsChecklistCommentAction, saveInsChecklistCommentSuccessAction, updateInsChecklistCommentAction, updateInsChecklistCommentSuccessAction, saveInsChecklistImageFilesAction, updateInsChecklistImageFilesSuccessAction, removeInsChecklistImageAction, clearInsChecklistImageAction, getInspectionChecklistProductAction, getInspectionChecklistProductSuccessAction } from '../../store/actions/inspection-checklist.action';
import { UploadService } from 'src/app/services/upload.service';

@Injectable()
export class InspectionChecklistEffect {
  getInspectionChecklistProductAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInspectionChecklistProductAction),
    switchMap(({ payload }) => {
      return this.inspectionChecklistRunSrv.post(payload, 'inspection-checklist-products').pipe(
        map((response: any) => {
          return getInspectionChecklistProductSuccessAction({ response });
        })
      )
    })
  ));

  removeInsChecklistImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(removeInsChecklistImageAction),
    switchMap(({ image }) =>
      this.InsChecklistImageSrv.delete(image?.id)
    )), { dispatch: false });

  saveInsChecklistImageFilesAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveInsChecklistImageFilesAction),
    switchMap(({ files }) => {
      return this.uploadSrv.upload(files, 'multiple').pipe(
        map((response: any) => {
          return updateInsChecklistImageFilesSuccessAction({ response });
        })
      )
    })
  ));
  saveInsChecklisImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveInsChecklisImageAction),
    switchMap(({ payload }) => {
      return this.InsChecklistImageSrv.post(payload).pipe(
        map((response: IInspectionChecklistImage[]) => {

          this.store.dispatch(clearInsChecklistImageAction());

          return saveInsChecklisImageSuccessAction({ response });
        })
      )
    })
  ));

  updateInsChecklistCommentAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateInsChecklistCommentAction),
    switchMap(({ payload }) => {
      return this.insChecklistCommentSrv.patch(payload).pipe(
        map((response: any) => {
          return updateInsChecklistCommentSuccessAction({ response });
        })
      )
    })
  ));

  deleteInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteInsChecklistAction),
    switchMap(({ id }) => this.insChecklistCommentSrv.delete(id)),
  ), { dispatch: false })

  getInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(getInsChecklistAction),
    switchMap(({ id }) => {
      return this.insChecklistCommentSrv.getById(id)
        .pipe(
          map((response: any) => {
            return getInsChecklistSuccessAction({ response });
          })
        )
    })
  ))

  saveInsChecklistCommentAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveInsChecklistCommentAction),
    switchMap(({ payload }) => {
      return this.insChecklistCommentSrv.post(payload).pipe(
        map((response: any) => {
          return saveInsChecklistCommentSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private uploadSrv: UploadService,
    private inspectionChecklistRunSrv: InspectionChecklistRunService,
    private insChecklistCommentSrv: InspectionChecklistCommentService,
    private InsChecklistImageSrv: InspectionChecklistImageService
  ) { }
}
