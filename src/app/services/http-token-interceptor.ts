import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, from, TimeoutError } from 'rxjs';
import { catchError, filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/contracts/store/reducers';
import { logoutAction } from '../modules/auth/store/auth.action';
import { appNotification } from '../store/actions/notification.action';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
import { LoaderService } from './loader.interceptor';

@Injectable()
export class TokenInterceptor extends GenericDestroyPageComponent implements HttpInterceptor {
  public durationInSeconds = 5;
  public isInspectionPage: boolean = false;
  public isInContractPage: boolean = false;
  public isInReportPage: boolean = false;
  public requests: HttpRequest<any>[] = [];

  constructor(private loaderSrv: LoaderService, private store: Store<AppState>, private router: Router) {
    super();

    this.router.events
      .pipe(takeUntil(this.$unsubscribe),
        filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isInspectionPage = e.urlAfterRedirects.includes('inspections');
        this.isInContractPage = e.urlAfterRedirects.includes('contracts');
        this.isInReportPage = e.urlAfterRedirects.includes('report');
      });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loaderSrv.isLoading.next(true);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          setTimeout(() => {
            this.loaderSrv.isLoading.next(false);
          }, 1000);
        }
        return event;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          from(this.handleUnauthorizedRequest(request));
          return throwError(error);
        }

        /* Handle 500 error */
        const hasError = error instanceof HttpErrorResponse && error.status === 500;
        if (hasError && this.isInspectionPage || hasError && this.isInContractPage) {
          from(this.handleHttpErrorRequest(request, 'Upload image request failed, please try again!'));
          return throwError(error);
        };

        /* Handle timeout error */
        if (error instanceof TimeoutError) {
          from(this.handleHttpErrorRequest(request, 'Timeout error, please try again!'));
          return throwError(error);
        };

        return next.handle(request);
      }), finalize(() => {
        /* we need to remove the loader in 5 seconds after requests is processed, this prevent being stuck in cors or cancelled status request, except report page with download prod images */
        setTimeout(() => {
          if (!this.isInReportPage)
            this.loaderSrv.isLoading.next(false);
        }, 3002);
      })
    )
  }

  private async handleHttpErrorRequest(request: HttpRequest<any>, msg?: string) {
    const module = request.url;
    let message: string = '';
    if (module?.includes('upload')) {
      message = msg;
    }
    this.store.dispatch(appNotification({ notification: { error: true, message } }));

    this.loaderSrv.isLoading.next(true);
  }

  private async handleUnauthorizedRequest(request: HttpRequest<any>) {
    console.log('%c SESSION EXPIRED!', 'background: red; color: white');

    this.loaderSrv.isLoading.next(false);
    this.store.dispatch(logoutAction());
  }
}
