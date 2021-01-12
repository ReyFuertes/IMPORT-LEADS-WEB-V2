import { AppState } from 'src/app/store/app.reducer';
import { ImageService } from './../../../../services/images.service';
import { UploadService } from './../../../../services/upload.service';
import { updateContractTermAction, updateContractTermSuccessAction, saveTermImageDetailAction, saveTermImageSuccess } from './../actions/contract-term.actions';
import { IContractTerm } from './../../contract.model';
import { ContractTermService } from './../../services/contract-term.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addContractTermAction, addContractTermSuccessAction, deleteContractTermAction, deleteContractTermSuccess } from '../actions/contract-term.actions';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loadContractCategoryAction } from '../actions/contract-category.action';

@Injectable()
export class ContractTermEffect {
  saveTermImageDetailAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveTermImageDetailAction),
    switchMap(({ image }) => this.imageService.post(image)
      .pipe(
        map((created: any) => {
          return saveTermImageSuccess({ created });
        })
      ))
  ));

  updateContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateContractTermAction),
    switchMap(({ payload }) => this.contractTermService.patch(payload)
      .pipe(
        map((updated: IContractTerm) => {
          return updateContractTermSuccessAction({ updated });
        })
      ))
  ));

  deleteContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteContractTermAction),
    switchMap(({ id }) => this.contractTermService.delete(id))
  ), { dispatch: false });

  addContractTermAction$ = createEffect(() => this.actions$.pipe(
    ofType(addContractTermAction),
    switchMap(({ payload }) => this.contractTermService.post(payload)
      .pipe(
        map((created: IContractTerm) => {
          /* reload contract category */
          setTimeout(() => {
            this.store.dispatch(loadContractCategoryAction({ id: payload?.contract_category?.id }))
          }, 1000);

          return addContractTermSuccessAction({ created });
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
