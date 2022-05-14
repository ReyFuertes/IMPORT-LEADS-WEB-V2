import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { getIsLoggedInSelector } from 'src/app/store/selectors/app.selector';
import { LOGINROUTE } from '../../constants/routes';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';

@Component({
  selector: 'il-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss']
})
export class PageNotFoundComponent extends GenericDestroyPageComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getIsLoggedInSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigateByUrl(LOGINROUTE);
        }
      });
  }

  public toLoginRoute(): void {
    this.router.navigateByUrl(LOGINROUTE);
  }
}
