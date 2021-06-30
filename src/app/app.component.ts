import { getSuccessSelector } from './store/selectors/notification.selector';
import { Observable } from 'rxjs';
import { INotification, removeNotification } from './store/actions/notification.action';
import { AppState } from 'src/app/store/app.reducer';
import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay, takeUntil, filter } from 'rxjs/operators';
import { initAppAction } from './store/actions/app.action';
import { getIsLoggedInSelector, getUserLangSelector } from './store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { GenericDestroyPageComponent } from './shared/generics/generic-destroy-page';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from './services/http-token-interceptor';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public title: string = 'Import Leads';
  public $notify: Observable<INotification>;
  public isLoggedIn: boolean = false;
  public svgPath: string = environment.svgPath;
  public hideTopNav: boolean = false;

  constructor(private localStorageSrv: StorageService, public translateService: TranslateService, private router: Router, public loaderSrv: LoaderService, private store: Store<AppState>, private cdRef: ChangeDetectorRef) {
    super();
    this.store.dispatch(initAppAction());

    this.translateService.addLangs(['en', 'cn']);

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.$unsubscribe),
        filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const hasAgreements = e.urlAfterRedirects.includes('agreement');
        const hasReport = e.urlAfterRedirects.includes('report');
        const inLoginPage = e.urlAfterRedirects.includes('login');

        if (hasAgreements && hasReport || inLoginPage) {
          this.hideTopNav = true;
        } else {
          this.hideTopNav = false;
        }
      });

    this.$notify = this.store.pipe(select(getSuccessSelector), delay(100));

    /* check if user islogin then show the topnav */
    this.store.pipe(select(getIsLoggedInSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        this.isLoggedIn = res;
      });

  }

  public onClose(): void {
    this.store.dispatch(removeNotification());
    this.loaderSrv.isLoading.next(false);
  }

  ngAfterViewInit(): void {


    this.cdRef.detectChanges();
  }
}
