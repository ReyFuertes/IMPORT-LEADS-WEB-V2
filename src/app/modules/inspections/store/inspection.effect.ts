import { IInspectionChecklist } from './../inspections.models';
import { loadChecklist, loadChecklistSuccess } from './inspection.action';
import { IContractChecklist } from './../../contracts/contract.model';
import { ChecklistService } from './../../contracts/services/contract-checklist.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class InspectionEffect {
  loadChecklist$ = createEffect(() => this.actions$.pipe(
    ofType(loadChecklist),
    mergeMap(() => this.checklistService.getAll().pipe(
      map((items: IInspectionChecklist[]) => {
        debugger
        return loadChecklistSuccess({ items });
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private checklistService: ChecklistService
  ) { }
}
