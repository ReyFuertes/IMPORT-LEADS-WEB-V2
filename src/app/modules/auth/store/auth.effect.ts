import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { loginAction, loginSuccessAction, logoutAction, loginFailedAction } from './auth.action';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { appNotification } from 'src/app/store/actions/notification.action';
import { loadVenuesAction } from '../../venues/store/venues.action';
import { loadAccessAction, loadAllRolesAction, getUserAccessAction, getUserRoleAction } from 'src/app/store/actions/app.action';
import { loadAllUsersAction } from '../../user-management/store/user-mgmt.actions';

@Injectable()
export class AuthEffect {
  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => localStorage.clear())
  ), { dispatch: false });

  loginAction$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    mergeMap(({ cred }) => this.authSrv.post(cred, 'signin')
      .pipe(
        map((accessToken: any) => {
          if (accessToken) {
            localStorage.setItem('at', JSON.stringify(accessToken));
            this.router.navigateByUrl('dashboard/contracts');

            this.store.dispatch(loadVenuesAction());
            this.store.dispatch(loadAccessAction());
            this.store.dispatch(loadAllRolesAction());
            this.store.dispatch(loadAllUsersAction());

            const at = JSON.parse(localStorage.getItem('at')) || null;
            if (at && at.user) {
              this.store.dispatch(getUserAccessAction({ id: at.user.id }));
              this.store.dispatch(getUserRoleAction({ id: at.user.id }));
            }
          }

          return loginSuccessAction({ accessToken });
        }),
        catchError((error: any) => {
          this.store.dispatch(appNotification({
            notification: { error: true, message: 'Login Failed!' }
          }));
          return of(loginFailedAction({ error: error.message }));
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private authSrv: AuthService
  ) { }
}
