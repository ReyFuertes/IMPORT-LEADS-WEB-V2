import { ImageService } from './../../../../services/images.service';
import { AppState } from './../../../../store/app.reducer';
import { UploadService } from './../../../../services/upload.service';
import { IContract } from './../../contract.model';
import { ContractsService } from './../../services/contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { loadContracts, loadContractSuccess, addContract, addContractSuccess, uploadContractImages, uploadContractImageSuccess, ReOrderImages, updateContract, updateContractSuccess, deleteContract, deleteContractSuccess, uploadTermImage, addImageUploadState } from '../actions/contracts.action';
import { Store } from '@ngrx/store';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractsEffect {
  uploadTermImage$ = createEffect(() => this.actions$.pipe(
    ofType(uploadTermImage),
    switchMap(({ file }) => this.uploadService.upload(file, 'single')
      .pipe(
        map(() => {
          return addImageUploadState({ isImageReady: true })
        }),
      ))
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContract),
    mergeMap(({ id }) => this.contractsService.delete(id).pipe(
      map((deleted: IContract) => deleteContractSuccess({ deleted }))
    ))
  ));

  updateContract$ = createEffect(() => this.actions$.pipe(
    ofType(updateContract),
    mergeMap(({ item }) => this.contractsService.patch(item)
      .pipe(
        map((updated: IContract) => updateContractSuccess({ updated }))
      ))
  ));

  addContract$ = createEffect(() => this.actions$.pipe(
    ofType(addContract),
    mergeMap(({ item }) => this.contractsService.post(item)
      .pipe(
        tap(() => this.store.dispatch(appNotification({ notification: { success: true, message: 'Contract successfully Added' } }))),
        map((created: IContract) => {
          if (created)
            return addContractSuccess({ created });
        })
      ))
  ));

  loadContracts$ = createEffect(() => this.actions$.pipe(
    ofType(loadContracts),
    mergeMap(({ param }) => this.contractsService.getAll(param).pipe(
      map((items: IContract[]) => {
        return loadContractSuccess({ items });
      })
    ))
  ));

  uploadImages$ = createEffect(() => this.actions$.pipe(
    ofType(uploadContractImages),
    mergeMap(({ files }) => {
      return this.uploadService.upload(files, 'multiple').pipe(
        map((file: any) => {
          return uploadContractImageSuccess({});
        })
      )
    })
  ));

  reOrderImages$ = createEffect(() => this.actions$.pipe(
    ofType(ReOrderImages),
    switchMap(({ images }) => this.imagesService.patch(images, 'reorder'))
  ), { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractsService: ContractsService,
    private uploadService: UploadService,
    private imagesService: ImageService
  ) { }
}
