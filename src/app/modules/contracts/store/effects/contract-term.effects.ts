import { ImageService } from './../../../../services/images.service';
import { UploadService } from './../../../../services/upload.service';
import { updateContractTerm, updateContractTermSuccess, uploadTermImage, saveTermImage, saveTermImageSuccess } from './../actions/contract-term.actions';
import { IContractTerm } from './../../contract.model';
import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addContractTerm, addContractTermSuccess, deleteContractTerm, deleteContractTermSuccess } from '../actions/contract-term.actions';

@Injectable()
export class ContractTermEffects {
  saveTermImage$ = createEffect(() => this.actions$.pipe(
    ofType(saveTermImage),
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

          return addContractTermSuccess({ created });
        })
      ))
  ));

  constructor(
    private actions$: Actions,
    private contractTermService: ContractTermService,
    private uploadService: UploadService,
    private imageService: ImageService
  ) { }
}
