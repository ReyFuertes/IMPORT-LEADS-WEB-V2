import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/contracts/store/reducers';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { logoutAction } from '../modules/auth/store/auth.action';
import { AppComponent } from '../app.component';
import { appNotification, removeNotification } from '../store/actions/notification.action';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
import { LoaderService } from './loader.interceptor';

@Injectable()
export class TokenInterceptor extends GenericDestroyPageComponent implements HttpInterceptor {
  public durationInSeconds = 5;
  public isInspectionPage: boolean = false;
  public isInContractPage: boolean = false;
  public requests: HttpRequest<any>[] = [];

  constructor(private loaderSrv: LoaderService, private store: Store<AppState>, private router: Router) {
    super();

    this.router.events
      .pipe(takeUntil(this.$unsubscribe),
        filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isInspectionPage = e.urlAfterRedirects.includes('inspections');
        this.isInContractPage = e.urlAfterRedirects.includes('contracts');
      });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        this.loaderSrv.isLoading.next(true);

        if (event instanceof HttpResponse) {
          const i = this.requests.indexOf(request);

          if (i >= 0) {
            this.requests.splice(i, 1);
          }
          this.loaderSrv.isLoading.next(this.requests.length > 0);
        }
        return event;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          from(this.handleUnauthorizedRequest(request));
          return throwError(error);
        }

        const hasError = error instanceof HttpErrorResponse && error.status === 500;
        if (hasError && this.isInspectionPage || hasError && this.isInContractPage) {
          from(this.handleFFRequest(request));
          return throwError(error);
        }

        return next.handle(request);
      }),
      finalize(() => { 
        this.loaderSrv.isLoading.next(this.requests.length > 0);
      })
    )
  }

  private async handleFFRequest(request: HttpRequest<any>) {
    const module = request.url;
    let message: string = '';
    if (module?.includes('upload')) {
      message = 'Upload image request failed, please try again!';
    }
    console.log('%c REQUEST 500 ERROR!', 'background: red; color: white');
    this.store.dispatch(appNotification({
      notification: { error: true, message }
    }));

    setTimeout(() => {
      this.loaderSrv.isLoading.next(true);
    }, 100);
  }

  private async handleUnauthorizedRequest(request: HttpRequest<any>) {
    console.log('%c SESSION EXPIRED!', 'background: red; color: white');
    this.store.dispatch(logoutAction());
  }
}
