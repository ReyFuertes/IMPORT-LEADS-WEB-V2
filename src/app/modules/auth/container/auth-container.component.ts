import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../contracts/store/reducers';
import { getIsLoggedInSelector } from 'src/app/store/selectors/app.selector';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ae-auth-container',
  templateUrl: './auth-container.component.html'
})
export class AuthContainerComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.pipe(select(getIsLoggedInSelector))
      .pipe(
        tap(isLoggedIn => {
          if (isLoggedIn) {
            this.router.navigateByUrl('/dashboard/contracts');
          }
        })
      )
  }

  ngOnInit(): void { }
}
