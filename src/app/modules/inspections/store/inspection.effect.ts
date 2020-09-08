import { IActiveInspection } from './../inspections.models';
import { loadInspectionChecklistSuccessAction } from './inspection.action';
import { ChecklistService } from './../../contracts/services/contract-checklist.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../contracts/store/actions/saved-checklist.action';
import { InspectionsService } from '../inspections.service';

@Injectable()
export class InspectionEffect {
  loadSavedChecklistAction$ = createEffect(() => this.actions$.pipe(
    ofType(loadSavedChecklistAction),
    mergeMap(() => {
      return this.inspectionSrv.getAll()
        .pipe(
          map((response: IActiveInspection[]) => {
            return loadInspectionChecklistSuccessAction({ response });
          })
        )
    })
  ))

  constructor(
    private actions$: Actions,
    private checklistSrv: ChecklistService,
    private inspectionSrv: InspectionsService
  ) { }
}
