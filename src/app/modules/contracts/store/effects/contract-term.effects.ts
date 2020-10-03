import { AppState } from 'src/app/store/app.reducer';
import { ImageService } from './../../../../services/images.service';
import { UploadService } from './../../../../services/upload.service';
import { updateContractTermAction, updateContractTermSuccess, saveTermImageDetailAction, saveTermImageSuccess } from './../actions/contract-term.actions';
import { IContractTerm } from './../../contract.model';
import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addContractTermAction, addContractTermSuccess, deleteContractTermAction, deleteContractTermSuccess } from '../actions/contract-term.actions';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loadContractCategoryAction } from '../actions/contract-category.action';

@Injectable()
export class ContractTermEffect {
  saveTermImageDetailAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveTermImageDetailAction),
    mergeMap(({ image }) => this.imageService.post(image)
      .pipe(
        map((created: any) => {
          return saveTermImageSuccess({ created });
        })
      ))
  ));

  updateContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractTermAction),
    mergeMap(({ payload }) => this.contractTermService.patch(payload)
      .pipe(
        tap(() => this.store.dispatch(appNotification({
          notification: { success: true, message: 'Term successfully Updated' }
        }))),
        map((updated: IContractTerm) => {
          if (updated)
            return updateContractTermSuccess({ updated });
        })
      ))
  ));

  deleteContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractTermAction),
    switchMap(({ id }) => this.contractTermService.delete(id))
  ), { dispatch: false });

  addContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractTermAction),
    mergeMap(({ payload }) => this.contractTermService.post(payload)
      .pipe(
        tap(() => this.store.dispatch(appNotification({ notification: { success: true, message: 'Term successfully Added' } }))),
        map((created: IContractTerm) => {
          if (created)
            return addContractTermSuccess({ created });
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private contractTermService: ContractTermService,
    private imageService: ImageService
  ) { }
}
