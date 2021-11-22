import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../users/users.service';
import { isUserExistForChangePasswordAction, isUserExistForChangePasswordSuccessAction } from './public.actions';

@Injectable()
export class PublicEffect {
  isUserExistForChangePasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(isUserExistForChangePasswordAction),
    switchMap(({ id }) => this.userService.getById(id, 'e').pipe(
      map(({ email }) => {
        return isUserExistForChangePasswordSuccessAction({ response: email });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userService: UserService
  ) { }
}
