import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { VenueProductsService } from './../venue-product.service';
import { removeVenueProduct } from './venue-product.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, switchMap } from 'rxjs/operators';
import { loadVenuesAction } from './venues.action';

@Injectable()
export class VenueProductsEffect {
  removeVenueProduct$ = createEffect(() => this.actions$.pipe(
    ofType(removeVenueProduct),
    switchMap(({ item }) =>
      this.venueProductsService.patch(item, 'remove')
        .pipe(tap(() => this.store.dispatch(loadVenuesAction({}))))
    )), { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private venueProductsService: VenueProductsService
  ) { }
}
