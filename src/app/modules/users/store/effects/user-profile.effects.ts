import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadUserProfileAction, loadUserProfileSuccessAction, uploadProfileImageAction, updateProfileAction, updateProfileSuccessAction } from '../actions/user-profile.actions';
import { UserProfileService } from '../../users.service';
import { IUserProfile } from '../../users.models';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { UploadService } from 'src/app/services/upload.service';

@Injectable()
export class UserProfileEffects {
  updateProfileAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateProfileAction),
    switchMap(({ payload }) => this.userProfileSrv.patch(payload).pipe(
      map((response: IUserProfile) => {
        return updateProfileSuccessAction({ response });
      })
    ))
  ));
  
  uploadProfileImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(uploadProfileImageAction),
    switchMap(({ file }) => this.uploadSrv.upload(file, 'single'))
  ), { dispatch: false });

  loadUserProfileAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserProfileAction),
    switchMap(({ id }) => this.userProfileSrv.getById(id).pipe(
      map((response: IUserProfile) => {
        return loadUserProfileSuccessAction({ response });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userProfileSrv: UserProfileService,
    private uploadSrv: UploadService) { }
}
