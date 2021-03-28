import { ImageService } from './../../../../services/images.service';
import { AppState } from './../../../../store/app.reducer';
import { UploadService } from './../../../../services/upload.service';
import { IContract } from './../../contract.model';
import { ContractsService } from './../../services/contracts.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { loadContractsAction, loadContractSuccessAction, addContractAction, addContractSuccessAction, uploadContractImagesAction, uploadContractImageSuccessAction, reOrderImagesAction, updateContractAction, updateContractSuccess, deleteContractAction, deleteContractSuccessAction, uploadTermImageAction, addImageUploadState } from '../actions/contracts.action';
import { Store } from '@ngrx/store';

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
    switchMap(({ id }) => this.contractsService.delete(id).pipe(
      map((deleted: IContract) => deleteContractSuccessAction({ deleted }))
    ))
  ));

  updateContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractAction),
    switchMap(({ item }) => this.contractsService.patch(item)
      .pipe(
        map((updated: IContract) => {
          return updateContractSuccess({ updated });
        })
      ))
  ));

  addContractAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractAction),
    switchMap(({ item }) => this.contractsService.post(item)
      .pipe(
        map((created: IContract) => {
          return addContractSuccessAction({ created });
        })
      ))
  ));

  loadContractsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadContractsAction),
    switchMap(({ param }) => this.contractsService.getAll(param).pipe(
      map((items: IContract[]) => {
        return loadContractSuccessAction({ items });
      })
    ))
  ));

  uploadContractImagesAction$ = createEffect(() => this.actions$.pipe(
    ofType(uploadContractImagesAction),
    switchMap(({ files }) => {
      return this.uploadService.upload(files, 'contracts/multiple').pipe(
        map((images: any) => {
          return uploadContractImageSuccessAction({ images });
        })
      )
    })
  ));
  reOrderImagesAction$ = createEffect(() => this.actions$.pipe(
    ofType(reOrderImagesAction),
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
