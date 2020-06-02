import { appNotification } from './../../../../store/notification.action';
import { AppState } from 'src/app/store/app.reducer';
import { ImageService } from './../../../../services/images.service';
import { UploadService } from './../../../../services/upload.service';
import { updateContractTerm, updateContractTermSuccess, uploadTermImage, saveTermImageDetail, saveTermImageSuccess } from './../actions/contract-term.actions';
import { IContractTerm } from './../../contract.model';
import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addContractTerm, addContractTermSuccess, deleteContractTerm, deleteContractTermSuccess } from '../actions/contract-term.actions';

@Injectable()
export class ContractTermEffects {
  saveTermImageDetail$ = createEffect(() => this.actions$.pipe(
    ofType(saveTermImageDetail),
    mergeMap(({ image }) => this.imageService.post(image)
      .pipe(
        map((created: any) => {
          return saveTermImageSuccess({ created });
        })
      ))
  ));

  uploadTermImage$ = createEffect(() => this.actions$.pipe(
    ofType(uploadTermImage),
    switchMap(({ file }) => this.uploadService.upload(file, 'single'))
  ), { dispatch: false });

  update$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractTerm),
    mergeMap(({ payload }) => this.contractTermService.patch(payload)
      .pipe(
        map((updated: IContractTerm) => {
          if (updated)
            this.store.dispatch(appNotification({ notification: { success: true, message: 'Term successfully Updated' } }));

          return updateContractTermSuccess({ updated });
        })
      ))
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractTerm),
    switchMap(({ id }) => this.contractTermService.delete(id))
  ), { dispatch: false });

  add$ = createEffect(() => this.actions$.pipe(
    ofType(addContractTerm),
    mergeMap(({ payload }) => this.contractTermService.post(payload)
      .pipe(
        map((created: IContractTerm) => {
          if (created)
            this.store.dispatch(appNotification({ notification: { success: true, message: 'Term successfully Added' } }));

          return addContractTermSuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractTermService: ContractTermService,
    private uploadService: UploadService,
    private imageService: ImageService
  ) { }
}
