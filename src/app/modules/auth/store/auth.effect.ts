import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { loginAction, loginSuccessAction, logoutAction, loginFailedAction } from './auth.action';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { loadVenuesAction } from '../../venues/store/venues.action';
import { loadAccessAction, loadAllRolesAction, getUserAccessAction, getUserRoleAction, loadAppUserProfileAction, loadUserListAction, loadUserClientsAction } from 'src/app/store/actions/app.action';
import { CONTRACTSROUTE } from 'src/app/shared/constants/routes';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../../users/users.service';

@Injectable()
export class AuthEffect {
  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => localStorage.clear())
  ), { dispatch: false });

  loginAction$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ cred }) => this.authSrv.post(cred, 'signin')
      .pipe(
        map((accessToken: any) => {
          if (accessToken) {
            this.storageSrv.set('at', JSON.stringify(accessToken));
            
            this.router.navigateByUrl(CONTRACTSROUTE);

            this.store.dispatch(loadVenuesAction({}));
            this.store.dispatch(loadAccessAction());
            this.store.dispatch(loadAllRolesAction());

            const at = JSON.parse(this.storageSrv.get('at')) || null;
  
            if (at?.user) {
              this.store.dispatch(getUserAccessAction({ id: at.user.id }));
              this.store.dispatch(getUserRoleAction({ id: at.user.id }));
              this.store.dispatch(loadAppUserProfileAction({ id: at.user.id }));
              this.store.dispatch(loadUserListAction());
              this.store.dispatch(loadUserClientsAction());
            }
          }

          return loginSuccessAction({ accessToken });
        }),
        catchError((error: any) => {
          return of(loginFailedAction({ error: error.message }));
        })
      ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private router: Router,
    private authSrv: AuthService,
    private storageSrv: StorageService,
    private userService: UserService
  ) { }
}
