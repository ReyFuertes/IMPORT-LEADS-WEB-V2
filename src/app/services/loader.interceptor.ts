import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
}

@Injectable()
export class LoaderInterceptor extends GenericDestroyPageComponent implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) {
    super();
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    setTimeout(() => {
      this.loaderService.isLoading.next(this.requests.length > 0);
    }, 1000);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe(event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
          err => { this.removeRequest(req); observer.error(err); },
          () => { this.removeRequest(req); observer.complete(); });

      // teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
      };
    });
  }
}



