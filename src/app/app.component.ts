import { getSuccessSelector } from './store/notification.selector';
import { Observable } from 'rxjs';
import { appNotification } from './store/notification.action';
import { getVenuesSelector } from './modules/venues/store/venues.selector';
import { AppState } from 'src/app/store/app.reducer';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadVenues } from './modules/venues/store/venues.action';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Import Leads';
  public $notify: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadVenues());
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(500));
  }
}
