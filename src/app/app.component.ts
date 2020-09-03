import { getSuccessSelector } from './store/selectors/notification.selector';
import { Observable } from 'rxjs';
import { INotification, removeNotification } from './store/actions/notification.action';
import { AppState } from 'src/app/store/app.reducer';
import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay, take, debounceTime } from 'rxjs/operators';
import { initAppAction } from './store/actions/app.action';
import { getIsLoggedInSelector } from './store/selectors/app.selector';
import { LoaderService } from './services/loader.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  public title: string = 'Import Leads';
  public $notify: Observable<INotification>;
  public $isLoggedIn: Observable<boolean>;

  constructor(public loaderSrv: LoaderService, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
    this.store.dispatch(initAppAction());
    
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(100));

    /* remove notification 2 seconds */
    this.$notify.pipe(debounceTime(2000)).subscribe((res) => {
      if (res)
        this.store.dispatch(removeNotification())
    });

    /* check if user islogin */
    this.$isLoggedIn = this.store.pipe(select(getIsLoggedInSelector));
  }

  ngOnInit(): void {
    //this.store.subscribe(res => console.log(res))

    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
