import { IActiveInspection, IInspectionChecklist, IInspectionRun } from './../../inspections.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { InspectionChecklistService } from '../../inspections.service';
import { Router } from '@angular/router';
import { AppState } from '../../../contracts/store/reducers';
import { saveInsChecklistAction, saveInsChecklistSuccessAction } from '../../store/actions/inspection-checklist.action';
import { loadInspectionRunAction } from '../actions/inspection.action';

@Injectable()
export class InspectionChecklistEffect {
  saveInsChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(saveInsChecklistAction),
    mergeMap(({ payload }) => {
      return this.insChecklistSrv.post(payload).pipe(
        tap((response: IInspectionChecklist) => {
          if (response && response?.inspection_run) {
            this.store.dispatch(loadInspectionRunAction({ id: response?.inspection_run?.id }));
          }
        }),
        map((response: IInspectionChecklist) => {
          return saveInsChecklistSuccessAction({ response });
        })
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private insChecklistSrv: InspectionChecklistService
  ) { }
}
