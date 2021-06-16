import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, from, TimeoutError, BehaviorSubject } from 'rxjs';
import { catchError, filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/contracts/store/reducers';
import { logoutAction } from '../modules/auth/store/auth.action';
import { appNotification } from '../store/actions/notification.action';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
@Injectable({ providedIn: 'root' })
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
}
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

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderSrv.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(request);
    this.loaderSrv.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(request)
        .subscribe(event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(request);
            observer.next(event);
          }
        }, error => {

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

          this.removeRequest(request);
          
          observer.error(error);
        }, () => {
          this.removeRequest(request);
          observer.complete();
        });
      return () => {
        this.removeRequest(request);
        subscription.unsubscribe();
      };
    });
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
