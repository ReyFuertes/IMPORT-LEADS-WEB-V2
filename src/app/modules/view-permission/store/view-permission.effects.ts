import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take, debounceTime } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { StorageService } from 'src/app/services/storage.service';
import { saveUserPermissionAction, saveUserPermissionSuccessAction, getUserPermissionAction, getUserPermissionSuccessAction } from './view-permission.actions';
import { UserViewService } from '../view-permission.service';

@Injectable()
export class UserViewEffects {
  saveUserPermissionAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserPermissionAction),
    switchMap(({ payload }) => {
      return this.userViewService.post(payload).pipe(
        map((response: any[]) => {
          return saveUserPermissionSuccessAction({ response });
        })
      )
    })
  ));

  getUserPermissionAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUserPermissionAction),
    switchMap(({ id }) => {
      return this.userViewService.getAll(id).pipe(
        map((response: any[]) => {
          return getUserPermissionSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userViewService: UserViewService,
    private storageSrv: StorageService) { }
}
