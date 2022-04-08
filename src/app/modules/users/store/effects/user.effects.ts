import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../../users.service';
import { changeUserPasswordAction, changeUserPasswordFailedAction, changeUserPasswordSuccessAction } from '../actions/user.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Injectable()
export class UserEffects {
  changeUserPasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(changeUserPasswordAction),
    switchMap(({ payload }) => this.userSrv.patch(payload, 'change-password').pipe(
      map((response: any) => {
        return changeUserPasswordSuccessAction({ response });
      }),
      catchError(() => {
        return of(changeUserPasswordFailedAction({ status: true }));
      })
    ))
  ));
  
  constructor(private store: Store<AppState>, private actions$: Actions, private userSrv: UserService) { }
}
