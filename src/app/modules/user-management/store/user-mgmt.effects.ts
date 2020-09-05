import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take, debounceTime } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { loadAllUsersAction, loadAllUsersSuccessAction, saveUserAccessAction, saveUserAccessSuccessAction, saveUserRoleAction, saveUserRoleSuccessAction, addUserAction, addUserSuccessAction, signUpUserAction, signUpUserSuccessAction, deleteUserAction, deleteUserSuccessAction, saveUserAction, saveUserSuccessAction } from './user-mgmt.actions';
import { IUserAccess, IUserRole, IUser } from '../user-mgmt.model';
import { UserAccessService, RolesService, UserRolesService, UserMgmtService } from '../user-mgmt.service';
import { AuthService } from '../../auth/auth.service';
import { appNotification } from 'src/app/store/actions/notification.action';
import { getUserAccessAction } from 'src/app/store/actions/app.action';

@Injectable()
export class UserMgmtEffects {
  saveUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserAction),
    switchMap(({ payload }) => {
      return this.userMgmtSrv.patch(payload).pipe(
        tap((response) => {
          if (response)
            this.store.dispatch(appNotification({
              notification: { success: true, message: 'User successfully Updated' }
            }))
        }),
        map((response: IUser) => {
          return saveUserSuccessAction({ response });
        })
      )
    })
  ));
  deleteUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserAction),
    mergeMap(({ id }) => this.userMgmtSrv.delete(id)
      .pipe(
        tap((created) => {
          if (created)
            this.store.dispatch(appNotification({
              notification: { success: true, message: 'User successfully Deleted' }
            }))
        }),
        map((deleted: IUser) => {
          return deleteUserSuccessAction({ deleted });
        })
      ))
  ));
  signUpUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(signUpUserAction),
    switchMap(({ payload }) => {
      return this.authSrv.post(payload, 'signup').pipe(
        map((response: IUser) => {
          return signUpUserSuccessAction({ response });
        })
      )
    })
  ));
  addUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(addUserAction),
    switchMap(({ payload }) => {
      return this.userMgmtSrv.post(payload).pipe(
        tap(() => {
          setTimeout(() => {
            this.store.dispatch(loadAllUsersAction())
          }, 1000);
        }),
        tap((created) => {
          if (created)
            this.store.dispatch(appNotification({
              notification: { success: true, message: 'User successfully Created' }
            }))
        }),
        map((response: IUser[]) => {
          return addUserSuccessAction({ response });
        })
      )
    })
  ));
  saveUserRoleAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserRoleAction),
    switchMap(({ payload }) => {
      return this.userRoleSrv.post(payload).pipe(
        // tap(() => this.store.dispatch(loadAllUsersAction())),
        map((response: IUserRole) => {
          return saveUserRoleSuccessAction({ response });
        })
      )
    })
  ));
  saveUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserAccessAction),
    switchMap(({ payload }) => this.userAccessSrv.post(payload).pipe(
      tap(() => {
        setTimeout(() => {
          /* NOTE: we dont need to make the user access changes realtime atm */
          const at = JSON.parse(localStorage.getItem('at')) || null;
          if (at && at.user) {
            //this.store.dispatch(getUserAccessAction({ id: at.user.id }))
          }
        });
      }),
      map((response: IUserAccess[]) => {
        return saveUserAccessSuccessAction({ response });
      })
    ))
  ));
  loadAllUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllUsersAction),
    mergeMap(() => this.userMgmtSrv.getAll().pipe(
      map((users: IUser[]) => {
        return loadAllUsersSuccessAction({ users });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userMgmtSrv: UserMgmtService,
    private userAccessSrv: UserAccessService,
    private userRoleSrv: UserRolesService,
    private authSrv: AuthService) { }
}
