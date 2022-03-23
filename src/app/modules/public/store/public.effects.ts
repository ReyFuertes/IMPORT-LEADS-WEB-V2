import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, retry, catchError, concatMap } from 'rxjs/operators';
import { NOTFOUNDPAGE } from 'src/app/shared/constants/routes';
import { loadChangePasswordErrorAction, loadProfileErrorAction } from 'src/app/store/actions/app.action';
import { loginFailedAction } from '../../auth/store/auth.action';
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
      }),
      retry(3),
      catchError((error: any) => {
        this.router.navigateByUrl(NOTFOUNDPAGE);
        console.log('%c LOAD CHANGE PASSWORD FAILED!', 'background: red; color: white');
        return of(loadChangePasswordErrorAction({ error: error.message }));
      })
    )),
    
  ));

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) { }
}
