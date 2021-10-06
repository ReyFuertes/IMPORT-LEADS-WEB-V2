import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map, switchMap, takeUntil, filter, catchError } from 'rxjs/operators';
import { initAppAction, initAppSuccessAction, loadAccessAction, loadAccessSuccessAction, loadAllRolesAction, loadAllRolesSuccessAction, getUserAccessAction, getUserAccessSuccessAction, getUserRoleAction, getUserRoleSuccessAction, loadAppUserProfileAction, loadAppUserProfileSuccessAction, loadProfileErrorAction, loadUserListAction, loadUserListSuccessAction, loadUserClientsAction, loadUserClientsSuccessAction, setDefaultLangAction } from '../actions/app.action';
import { logoutAction, logoutSuccessAction } from 'src/app/modules/auth/store/auth.action';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { loadVenuesAction } from 'src/app/modules/venues/store/venues.action';
import { IAccess } from 'src/app/models/user.model';
import { AccessService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { RolesService, UserAccessService, UserRolesService } from 'src/app/modules/user-management/user-mgmt.service';
import { IRole, IUser, IUserAccess } from 'src/app/modules/user-management/user-mgmt.model';
import { UserProfileService, UserService } from 'src/app/modules/users/users.service';
import { IUserProfile } from 'src/app/modules/users/users.models';
import { CONTRACTSROUTE, LOGINROUTE, NOTFOUNDPAGE } from 'src/app/shared/constants/routes';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class InitAppEffect {
  loadUserClientsAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserClientsAction),
    switchMap(() => {
      return this.userSrv.getAll('clients').pipe(
        map((response: IUser[]) => {
          return loadUserClientsSuccessAction({ response });
        })
      )
    })
  ));

  loadUserListAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadUserListAction),
    switchMap(() => {
      return this.userSrv.getAll('list').pipe(
        map((response: IUser[]) => {
          return loadUserListSuccessAction({ response });
        })
      )
    })
  ));

  getUserRoleAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUserRoleAction),
    switchMap(({ id }) => {
      return this.userRolesSrv.getAll(id).pipe(
        map((response: string[]) => {
          return getUserRoleSuccessAction({ response });
        })
      )
    })
  ));
  getUserAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(getUserAccessAction),
    switchMap(({ id }) => {
      return this.userAccessSrv.getAll(id).pipe(
        map((response: IUserAccess[]) => {
          return getUserAccessSuccessAction({ response });
        })
      )
    })
  ));
  loadAllRolesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllRolesAction),
    switchMap(() => {
      return this.roleSrv.getAll().pipe(
        map((roles: IRole[]) => {
          return loadAllRolesSuccessAction({ roles });
        })
      )
    })
  ));
  loadAccessAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAccessAction),
    switchMap(() => this.accessSrv.getAll().pipe(
      map((response: IAccess[]) => {
        return loadAccessSuccessAction({ response });
      })
    ))
  ));
  logoutAction$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => {
      localStorage.clear();
      this.router.navigateByUrl(LOGINROUTE);
    }),
    map(() => logoutSuccessAction())
  ));
  initAppAction$ = createEffect(() => this.actions$.pipe(
    ofType(initAppAction),
    switchMap(() => of(this.storageSrv.get('at'))
      .pipe(
        tap((res) => {
          if (res) {
            const hasSort = localStorage.getItem('venueSortBy');
            let venueOrderby: string;
            if (hasSort) {
              venueOrderby = JSON.parse(hasSort);
            }
            this.store.dispatch(loadVenuesAction({ param: venueOrderby }));
            this.store.dispatch(loadAccessAction());
            this.store.dispatch(loadAllRolesAction());

            const at = JSON.parse(this.storageSrv.get('at')) || null;
            const isLoggedIn = at?.user;

            if (isLoggedIn) {
              this.store.dispatch(getUserAccessAction({ id: at.user.id }));
              this.store.dispatch(getUserRoleAction({ id: at.user.id }));
              this.store.dispatch(loadAppUserProfileAction({ id: at.user.id }));
              this.store.dispatch(loadUserListAction());
              this.store.dispatch(loadUserClientsAction());
            }
            this.isInloginpage(isLoggedIn);
          }
        }),
        map((accessToken: any) => {
          let token: any;
          if (accessToken)
            token = JSON.parse(accessToken).accessToken || null;

          return initAppSuccessAction({ token });
        })
      ))
  ));

  loadAppUserProfileAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadAppUserProfileAction),
    switchMap(({ id }) => this.userProfileSrv.getById(id)
      .pipe(
        map((detail: IUserProfile) => {
          this.storageSrv.set('userp', JSON.stringify(detail));

          this.store.dispatch(setDefaultLangAction({ language: detail?.language }));
          return loadAppUserProfileSuccessAction({ detail });
        }),
        catchError((error: any) => {
          this.store.dispatch(logoutAction());
          this.router.navigateByUrl(NOTFOUNDPAGE);

          console.log('%c PROFILE DOESNT EXIST!', 'background: green; color: white');

          return of(loadProfileErrorAction({ error: error.message }));
        })
      ))
  ));

  public isInloginpage(isLoggedIn: boolean): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const inLoginPage = e.urlAfterRedirects.includes('login');

        if (isLoggedIn && inLoginPage) {
          this.router.navigateByUrl(CONTRACTSROUTE);
        }
      });
  }

  constructor(private store: Store<AppState>, 
    private actions$: Actions,
    private router: Router, 
    private userSrv: UserService,
    private accessSrv: AccessService, 
    private userAccessSrv: UserAccessService,
    private roleSrv: RolesService, 
    private userRolesSrv: UserRolesService, 
    private userProfileSrv: UserProfileService,
    private storageSrv: StorageService) { }
}
