import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { UploadService } from './../../../services/upload.service';
import { IVenue } from './../venues.models';
import { loadVenuesAction, loadVenuesSuccessAction, addVenueAction, addVenueSuccessAction, deleteVenueAction, deleteVenueSuccessAction, updateVenueAction, updateVenueSuccessAction, uploadVenueImageAction } from './venues.action';
import { VenuesService } from './../venues.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class VenuesEffects {
  uploadVenueImageAction$ = createEffect(() => this.actions$.pipe(
    ofType(uploadVenueImageAction),
    switchMap(({ file }) => this.uploadService.upload(file, 'single'))
  ), { dispatch: false });

  deleteVenueAction$ = createEffect(() => this.actions$.pipe(
    ofType(deleteVenueAction),
    switchMap(({ id }) => this.venuesService.delete(id)
      .pipe(
        map((deleted: IVenue) => {
          return deleteVenueSuccessAction({ deleted });
        })
      ))
  ));
  updateVenueAction$ = createEffect(() => this.actions$.pipe(
    ofType(updateVenueAction),
    switchMap(({ item }) => this.venuesService.post(item)
      .pipe(
        map((updated: IVenue) => {
          return updateVenueSuccessAction({ updated });
        })
      ))
  ));
  addVenueAction$ = createEffect(() => this.actions$.pipe(
    ofType(addVenueAction),
    switchMap(({ item }) => this.venuesService.post(item)
      .pipe(
        map((created: IVenue) => {
          return addVenueSuccessAction({ created });
        })
      ))
  ));
  loadVenuesAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadVenuesAction),
    switchMap(({ param }) => this.venuesService.getAll(param).pipe(
      map((items: IVenue[]) => {
        return loadVenuesSuccessAction({ items });
      })
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private venuesService: VenuesService,
    private uploadService: UploadService
  ) { }
}
