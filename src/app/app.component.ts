import { getSuccessSelector } from './store/selectors/notification.selector';
import { Observable } from 'rxjs';
import { INotification, removeNotification } from './store/actions/notification.action';
import { AppState } from 'src/app/store/app.reducer';
import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay, take, debounceTime, takeUntil, filter } from 'rxjs/operators';
import { initAppAction } from './store/actions/app.action';
import { getIsLoggedInSelector } from './store/selectors/app.selector';
import { LoaderService } from './services/loader.interceptor';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from './shared/generics/generic-destroy-page';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public title: string = 'Import Leads';
  public $notify: Observable<INotification>;
  public isLoggedIn: boolean = false;
  public svgPath: string = environment.svgPath;
  public hideTopNav: boolean = false;

  constructor(private router: Router, public loaderSrv: LoaderService, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
    super();

    this.store.dispatch(initAppAction());
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.$unsubscribe),
        filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.urlAfterRedirects.includes('report')) {
          this.hideTopNav = true;
        } else {
          this.hideTopNav = false;
        }
      });

    this.store.subscribe(res => console.log(res))
    this.$notify = this.store.pipe(select(getSuccessSelector), delay(100));

    /* check if user islogin then show the topnav */
    this.store.pipe(select(getIsLoggedInSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.isLoggedIn = res;
      })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
