import { loadVenues } from './venues.action';
import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { VenueProductsService } from './../venue-product.service';
import { removeVenueProduct, removeVenueProductSuccess } from './venue-product.action';
import { IVenue, IvenueProduct } from './../venues.models';
import { VenuesService } from './../venues.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class VenueProductsEffects {
  removeVenueProduct$ = createEffect(() => this.actions$.pipe(
    ofType(removeVenueProduct),
    mergeMap(({ item }) =>
      this.venueProductsService.patch(item, 'remove')
        .pipe(tap(() => this.store.dispatch(loadVenues())))
    )), { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private venueProductsService: VenueProductsService
  ) { }
}
