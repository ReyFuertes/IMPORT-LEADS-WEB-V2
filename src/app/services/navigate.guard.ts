import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanDeactivate, } from '@angular/router';
import { InspectionRunPageComponent } from '../modules/inspections/components/inspection-run-page/inspection-run-page.component';
import { MatDialog } from '@angular/material/dialog';
import { GenericDestroyPageComponent } from '../shared/generics/generic-destroy-page';

@Injectable()
export class NavigateGuard extends GenericDestroyPageComponent implements CanDeactivate<InspectionRunPageComponent> {
  constructor(private dialog: MatDialog) {
    super();
  }

  canDeactivate(component: InspectionRunPageComponent): Observable<boolean> | boolean {
    return component.$pauseOrRun();
  }
}