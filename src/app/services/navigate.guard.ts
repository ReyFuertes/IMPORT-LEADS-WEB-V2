import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanDeactivate, Router, } from '@angular/router';
import { InspectionRunPageComponent } from '../modules/inspections/components/inspection-run-page/inspection-run-page.component';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
import { AppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getIsStopSelector } from '../modules/inspections/store/selectors/inspection.selector';

@Injectable()
export class NavigateGuard extends GenericDestroyPageComponent implements CanDeactivate<InspectionRunPageComponent> {
  constructor(private router: Router, private store: Store<AppState>) {
    super();
  }

  canDeactivate(component: InspectionRunPageComponent): Observable<boolean> | boolean {
    let isStop: boolean;
    this.store.pipe(select(getIsStopSelector)).subscribe(stat => isStop = stat);

    let isStopOrRun: any;
    try {
      isStopOrRun = component?.$pauseOrRun();
    } catch (error) {
      isStopOrRun = true;
    }

    /* if the checklist run is paused then do not display the confirmation run/stop dialog */
    return isStop ? true : isStopOrRun;
  }
}