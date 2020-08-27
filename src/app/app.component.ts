import { getSuccessSelector } from './store/selectors/notification.selector';
import { Observable } from 'rxjs';
import { appNotification, INotification, removeNotification } from './store/actions/notification.action';
import { getVenuesSelector } from './modules/venues/store/venues.selector';
import { AppState } from 'src/app/store/app.reducer';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadVenues } from './modules/venues/store/venues.action';
import { delay, take, debounceTime } from 'rxjs/operators';
import { initAppAction } from './store/actions/app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'Import Leads';
  public $notify: Observable<INotification>;
  public $hasLoggedIn: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(initAppAction());
    this.store.dispatch(loadVenues());
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(500));

    /* remove notification 2seconds */
    this.$notify.pipe(debounceTime(2000)).subscribe((res) => {
      if (res) {
        this.store.dispatch(removeNotification())
      }
    });

    this.store.subscribe(res => console.log(res))

    /* check if user islogin */
    setTimeout(() => {
      //this.$hasLoggedIn = this.store.pipe(select(getHasLoggedInSelector));
    }, 200);
  }
}
