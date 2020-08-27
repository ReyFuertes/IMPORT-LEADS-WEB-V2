import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { initAppAction, initAppSuccessAction } from '../actions/app.action';
import { logoutAction, logoutSuccessAction } from 'src/app/modules/auth/store/auth.action';
import { Router } from '@angular/router';

@Injectable()
export class InitAppEffect {
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
        map((accessToken: any) => {
          let token: any;
          if (accessToken)
            token = JSON.parse(accessToken).accessToken || null;

          return initAppSuccessAction({ token });
        })
      ))
  ));

  constructor(private actions$: Actions, private router: Router) { }
}
