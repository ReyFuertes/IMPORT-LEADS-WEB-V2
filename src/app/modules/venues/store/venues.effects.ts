import { IVenue } from './../venues.models';
import { loadVenues, loadVenuesSuccess, addVenue, addVenueSuccess, deleteVenue, deleteVenueSuccess, updateVenue, updateVenueSuccess } from './venues.action';
import { VenuesService } from './../venues.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class VenuesEffects {
  deleteVenue$ = createEffect(() => this.actions$.pipe(
    ofType(deleteVenue),
    mergeMap(({ id }) => this.venuesService.delete(id)
      .pipe(
        map((deleted: IVenue) => {
          return deleteVenueSuccess({ deleted });
        })
      ))
  ));

  updateVenue$ = createEffect(() => this.actions$.pipe(
    ofType(updateVenue),
    mergeMap(({ item }) => this.venuesService.post(item)
      .pipe(
        map((updated: IVenue) => {
          return updateVenueSuccess({ updated });
        })
      ))
  ));

  addVenue$ = createEffect(() => this.actions$.pipe(
    ofType(addVenue),
    mergeMap(({ item }) => this.venuesService.post(item)
      .pipe(
        map((created: IVenue) => {
          return addVenueSuccess({ created });
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
