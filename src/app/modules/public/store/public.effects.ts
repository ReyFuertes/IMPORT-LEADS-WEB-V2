import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, retry, catchError } from 'rxjs/operators';
import { NOTFOUNDPAGE } from 'src/app/shared/constants/routes';
import { loadChangePasswordErrorAction } from 'src/app/store/actions/app.action';
import { UserService } from '../../users/users.service';
import { ValidatePublicUserPasswordAction, ValidatePublicUserPasswordSuccessAction, isUserExistForChangePasswordAction, isUserExistForChangePasswordSuccessAction } from './public.actions';

@Injectable()
export class PublicEffect {
  changePublicUserPasswordAction$ = createEffect(() => this.actions$.pipe(
    ofType(ValidatePublicUserPasswordAction),
    switchMap(({ payload }) => this.userService.patch(payload, 'public/validate-password').pipe(
      map((response: any) => {
        return ValidatePublicUserPasswordSuccessAction({ response });
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
