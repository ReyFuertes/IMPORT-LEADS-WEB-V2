import { ImageService } from './../../../../services/images.service';
import { AppState } from './../../../../store/app.reducer';
import { UploadService } from './../../../../services/upload.service';
import { IContract } from './../../contract.model';
import { ContractsService } from './../../services/contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { loadContractsAction, loadContractSuccess, addContractAction, addContractSuccess, uploadContractImagesAction, uploadContractImageSuccess, ReOrderImagesAction, updateContractAction, updateContractSuccess, deleteContractAction, deleteContractSuccess, uploadTermImageAction, addImageUploadState } from '../actions/contracts.action';
import { Store } from '@ngrx/store';
import { appNotification } from 'src/app/store/actions/notification.action';

@Injectable()
export class ContractsEffect {
  uploadTermImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(uploadTermImageAction),
    switchMap(({ file }) => this.uploadService.upload(file, 'single')
      .pipe(
        map(() => {
          return addImageUploadState({ isImageReady: true })
        }),
      ))
  ));

  deleteContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractAction),
    mergeMap(({ id }) => this.contractsService.delete(id).pipe(
      map((deleted: IContract) => deleteContractSuccess({ deleted }))
    ))
  ));

  updateContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractAction),
    mergeMap(({ item }) => this.contractsService.patch(item)
      .pipe(
        map((updated: IContract) => {
          return updateContractSuccess({ updated });
        })
      ))
  ));

  addContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractAction),
    mergeMap(({ item }) => this.contractsService.post(item)
      .pipe(
        tap(() => this.store.dispatch(appNotification({ notification: { success: true, message: 'Contract successfully Added' } }))),
        map((created: IContract) => {
          if (created)
            return addContractSuccess({ created });
        })
      ))
  ));

  loadContractsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractsAction),
    mergeMap(({ param }) => this.contractsService.getAll(param).pipe(
      map((items: IContract[]) => {
        return loadContractSuccess({ items });
      })
    ))
  ));

  uploadContractImagesAction$ = createEffect(() => this.actions$.pipe(
    ofType(uploadContractImagesAction),
    mergeMap(({ files }) => {
      return this.uploadService.upload(files, 'multiple').pipe(
        map((file: any) => {
          return uploadContractImageSuccess({});
        })
      )
    })
  ));
  ReOrderImagesAction$ = createEffect(() => this.actions$.pipe(
    ofType(ReOrderImagesAction),
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
