import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../modules/contracts/store/reducers';
import { appNotification } from '../store/actions/notification.action';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {

        // handle only 401 error
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.store.dispatch(appNotification({
            notification: {
              success: true,
              message: error.error
            }
          }));

          from(this.handleRequest(request));
          return throwError(error);
        }
        return next.handle(request);
      })
    );
  }

  private async handleRequest(request: HttpRequest<any>) {
    //const isRetriedRequest = request.headers.get("retry");
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
