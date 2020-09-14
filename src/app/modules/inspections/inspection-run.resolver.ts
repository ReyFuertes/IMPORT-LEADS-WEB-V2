import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { hasInspectionLoadedSelector } from './store/selectors/inspection.selector';
import { loadInspectionRunAction } from './store/actions/inspection.action';

@Injectable()
export class InspectionRunResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return (this.store.pipe(select(hasInspectionLoadedSelector))).pipe(
      tap(loaded => {
        if (!loaded) {
          const id = route.paramMap.get('id') || null;
          if (id) {
            this.store.dispatch(loadInspectionRunAction({ id }));
          }
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
