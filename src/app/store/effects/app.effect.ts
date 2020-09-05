import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap } from 'rxjs/operators';
import { initAppAction, initAppSuccessAction, loadAccessAction, loadAccessSuccessAction, loadAllRolesAction, loadAllRolesSuccessAction, getUserAccessAction, getUserAccessSuccessAction } from '../actions/app.action';
import { logoutAction, logoutSuccessAction } from 'src/app/modules/auth/store/auth.action';
import { Router } from '@angular/router';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { loadVenuesAction } from 'src/app/modules/venues/store/venues.action';
import { IAccess } from 'src/app/models/user.model';
import { AccessService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { RolesService, UserAccessService } from 'src/app/modules/user-management/user-mgmt.service';
import { IRole, IUserAccess } from 'src/app/modules/user-management/user-mgmt.model';

@Injectable()
export class InitAppEffect {
  getUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUserAccessAction),
    switchMap(({ id }) => {
      return this.userAccessSrv.getAll(id).pipe(
        map((response: IUserAccess[]) => {
          return getUserAccessSuccessAction({ response });
        })
      )
    })
  ));
  loadAllRolesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllRolesAction),
    switchMap(() => {
      return this.roleSrv.getAll().pipe(
        map((roles: IRole[]) => {
          return loadAllRolesSuccessAction({ roles });
        })
      )
    })
  ));

  loadAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAccessAction),
    switchMap(() => this.accessSrv.getAll().pipe(
      map((response: IAccess[]) => {
        return loadAccessSuccessAction({ response });
      })
    ))
  ));
  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl('login');
    }),
    map(() => logoutSuccessAction())
  ));
  initAppAction$ = createEffect(() => this.actions$.pipe(
    ofType(initAppAction),
    switchMap(() => of(localStorage.getItem('at'))
      .pipe(
        tap((res) => {
          if (res) {
            this.store.dispatch(loadVenuesAction());
            this.store.dispatch(loadAccessAction());
            this.store.dispatch(loadAllRolesAction());

            const at = JSON.parse(localStorage.getItem('at')) || null;
            if (at && at.user) {
              this.store.dispatch(getUserAccessAction({ id: at.user.id }))
            }
          }
        }),
        map((accessToken: any) => {
          let token: any;
          if (accessToken)
            token = JSON.parse(accessToken).accessToken || null;

          return initAppSuccessAction({ token });
        })
      ))
  ));

  constructor(private store: Store<AppState>, private actions$: Actions,
    private router: Router, private accessSrv: AccessService, private userAccessSrv: UserAccessService,
    private roleSrv: RolesService) { }
}
