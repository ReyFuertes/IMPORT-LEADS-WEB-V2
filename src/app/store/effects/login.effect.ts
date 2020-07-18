import { AppState } from './../app.reducer';
import { login, loginSuccess, isLoggingInAction } from './../actions/login.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap, catchError, retry, } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { of, defer } from 'rxjs';
import { ILoginUser } from 'src/app/modules/auth/auth.model';
import { locIsLoggedIn, locStorageUser } from 'src/app/shared/constants/localStorage';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(({ payload }) => {
      return this.authSrv.post(payload)
        .pipe(
          retry(3), /* retry 3 times */
          tap((response => {
            localStorage.setItem(locIsLoggedIn, JSON.stringify(true));
            localStorage.setItem(locStorageUser, JSON.stringify(response));
          })),
          map((response: ILoginUser) => loginSuccess({ response }))
        )
    }),
    catchError((error) => of(error))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authSrv: AuthService,
  ) { }
}

