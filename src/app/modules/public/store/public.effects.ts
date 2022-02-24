import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, retry } from 'rxjs/operators';
import { UserService } from '../../users/users.service';
import { ChangePublicUserPasswordAction, ChangePublicUserPasswordSuccessAction, isUserExistForChangePasswordAction, isUserExistForChangePasswordSuccessAction } from './public.actions';

@Injectable()
export class PublicEffect {
  changePublicUserPasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(ChangePublicUserPasswordAction),
    switchMap(({ payload }) => this.userService.patch(payload, 'public/change-password').pipe(
      map((response: any) => {
        return ChangePublicUserPasswordSuccessAction({ response });
      })
    ))
  ));

  isUserExistForChangePasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(isUserExistForChangePasswordAction),
    switchMap(({ id }) => this.userService.getById(id, 'e').pipe(
      map((response: any) => {
        return isUserExistForChangePasswordSuccessAction({ response });
      })
    )),
    retry(3)
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
