import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { UploadService } from 'src/app/services/upload.service';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loadAllUsersAction, loadAllUsersSuccessAction } from './user-mgmt.actions';
import { IUserMgmt } from '../user-mgmt.model';
import { UserManagementService } from '../user-management.service';

@Injectable()
export class UserMgmtEffects {
  loadAllUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllUsersAction),
    mergeMap(() => this.userMgmtSrv.getAll().pipe(
      map((users: IUserMgmt[]) => {
        return loadAllUsersSuccessAction({ users });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userMgmtSrv: UserManagementService) { }
}
