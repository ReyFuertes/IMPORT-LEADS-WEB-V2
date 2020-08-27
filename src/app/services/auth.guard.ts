import { AppState } from 'src/app/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { getIsLoggedInSelector } from '../store/selectors/app.selector';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  /* check if user is currently loggedin */
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(getIsLoggedInSelector))
      .pipe(
        tap(isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigateByUrl('/login');
          }
        })
      )
  }
}
