import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { loadAllUsersAction, loadAllUsersSuccessAction, saveUserAccessAction, saveUserAccessSuccessAction, saveUserRoleAction, saveUserRoleSuccessAction, addUserAction, addUserSuccessAction, signUpUserAction, signUpUserSuccessAction, deleteUserAction, deleteUserSuccessAction, saveUserAction, saveUserSuccessAction } from './user-mgmt.actions';
import { IUserAccess, IUserRole, IUser } from '../user-mgmt.model';
import { UserAccessService, UserRolesService, UserManagementService } from '../user-mgmt.service';
import { AuthService } from '../../auth/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class UserMgmtEffects {
  saveUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserAction),
    switchMap(({ payload }) => {
      return this.userManagementService.patch(payload).pipe(
        map((response: IUser) => {
          return saveUserSuccessAction({ response });
        })
      )
    })
  ));
  deleteUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUserAction),
    switchMap(({ id }) => this.userManagementService.delete(id)
      .pipe(
        map((deleted: IUser) => {
          return deleteUserSuccessAction({ deleted });
        })
      ))
  ));
  signUpUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(signUpUserAction),
    switchMap(({ payload }) => {
      return this.authSrv.post(payload, 'signup').pipe(
        map((response: IUser[]) => {
          return signUpUserSuccessAction({ response });
        })
      )
    })
  ));
  addUserAction$ = createEffect(() => this.actions$.pipe(
    ofType(addUserAction),
    switchMap(({ payload }) => {
      return this.userManagementService.post(payload).pipe(
        map((response: IUser) => {

          this.store.dispatch(loadAllUsersAction());

          return addUserSuccessAction({ response });
        })
      )
    })
  ));
  saveUserRoleAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserRoleAction),
    switchMap(({ payload }) => {
      return this.userRoleSrv.post(payload).pipe(
        map((response: IUserRole) => {

          this.store.dispatch(loadAllUsersAction());

          return saveUserRoleSuccessAction({ response });
        })
      )
    })
  ));
  saveUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveUserAccessAction),
    switchMap(({ payload }) => this.userAccessSrv.post(payload).pipe(
      map((response: IUserAccess[]) => {
        return saveUserAccessSuccessAction({ response });
      })
    ))
  ));
  loadAllUsersAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllUsersAction),
    switchMap(() => this.userManagementService.getAll().pipe(
      map((users: IUser[]) => {
        return loadAllUsersSuccessAction({ users });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userManagementService: UserManagementService,
    private userAccessSrv: UserAccessService,
    private userRoleSrv: UserRolesService,
    private storageSrv: StorageService,
    private authSrv: AuthService) { }
}
