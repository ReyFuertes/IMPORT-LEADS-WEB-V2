import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take } from 'rxjs/operators';
import { UserProfileService, UserService } from '../../users.service';
import { IUserProfile } from '../../users.models';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { UploadService } from 'src/app/services/upload.service';
import { changeUserPasswordAction, changeUserPasswordSuccessAction } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  changeUserPasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(changeUserPasswordAction),
    switchMap(({ payload }) => this.userSrv.patch(payload, 'change-password').pipe(
      map((response: any) => {
        return changeUserPasswordSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userSrv: UserService,
    private uploadSrv: UploadService) { }
}
