import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, switchMap, take, debounceTime } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class UserViewEffects {

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private storageSrv: StorageService) { }
}
