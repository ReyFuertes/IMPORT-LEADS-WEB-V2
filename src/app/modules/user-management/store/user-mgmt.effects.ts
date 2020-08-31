import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { UploadService } from 'src/app/services/upload.service';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loadAllUsersAction, loadAllUsersSuccessAction, saveUserAccessAction, saveUserAccessSuccessAction } from './user-mgmt.actions';
import { IUserMgmt, IUserAccess } from '../user-mgmt.model';
import { UserManagementService } from '../user-management.service';
import { UserAccessService } from '../user-mgmt.service';

@Injectable()
export class UserMgmtEffects {
  saveUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserAccessAction),
    switchMap(({ payload }) => this.userAccessSrv.post(payload).pipe(
      tap(() => this.store.dispatch(loadAllUsersAction())),
      map((response: IUserAccess) => {
        return saveUserAccessSuccessAction({ response });
      })
    ))
  ));

  loadAllUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllUsersAction),
    mergeMap(() => this.userMgmtSrv.getAll().pipe(
      map((users: []) => {
        return loadAllUsersSuccessAction({ users });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userMgmtSrv: UserManagementService,
    private userAccessSrv: UserAccessService) { }
}
