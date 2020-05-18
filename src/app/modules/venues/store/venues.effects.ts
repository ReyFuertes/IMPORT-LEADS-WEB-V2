import { IVenue } from './../venues.models';
import { loadVenues, loadVenuesSuccess } from './venues.action';
import { VenuesService } from './../venues.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class VenuesEffects {
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
