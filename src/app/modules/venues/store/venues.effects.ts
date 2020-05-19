import { IVenue } from './../venues.models';
import { loadVenues, loadVenuesSuccess, AddVenue, AddVenueSuccess } from './venues.action';
import { VenuesService } from './../venues.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class VenuesEffects {
  addVenue$ = createEffect(() => this.actions$.pipe(
    ofType(AddVenue),
    mergeMap(({ item }) => this.venuesService.post(item)
      .pipe(
        map((created: IVenue) => {
          return AddVenueSuccess({ created });
        })
      ))
  ));

  loadVenues$ = createEffect(() => this.actions$.pipe(
    ofType(loadVenues),
    mergeMap(() => this.venuesService.getAll().pipe(
      map((items: IVenue[]) => {
        return loadVenuesSuccess({ items });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private venuesService: VenuesService
  ) { }
}
