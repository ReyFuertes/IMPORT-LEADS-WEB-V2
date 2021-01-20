import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanDeactivate, } from '@angular/router';
import { InspectionRunPageComponent } from '../modules/inspections/components/inspection-run-page/inspection-run-page.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';
import { AppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getIsPausedSelector } from '../modules/inspections/store/selectors/inspection.selector';

@Injectable()
export class NavigateGuard extends GenericDestroyPageComponent implements CanDeactivate<InspectionRunPageComponent> {
  constructor(private store: Store<AppState>) {
    super();
  }

  canDeactivate(component: InspectionRunPageComponent): Observable<boolean> | boolean {
    let isPaused: boolean;
    this.store.pipe(select(getIsPausedSelector)).subscribe(stat => isPaused = stat);
    
    let isPauseOrRun: any;
    try {
      isPauseOrRun = component?.$pauseOrRun();
    } catch (error) {
      isPauseOrRun = true;
    }
    
    /* if the checklist run is paused then do not display the confirmation run/stop dialog */
    return isPaused ? true : isPauseOrRun;
  }
}