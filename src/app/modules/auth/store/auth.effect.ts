import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { loginAction, loginSuccessAction, logoutAction } from './auth.action';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
        tap((accessToken) => {
          if (accessToken) {
            localStorage.setItem('at', JSON.stringify(accessToken));
            this.router.navigateByUrl('dashboard/contracts');
          }
        }),
        map((accessToken: any) => {
          return loginSuccessAction({ accessToken });
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
