import { loadInspectionChecklistAction } from './../store/inspection.action';
import { AppState } from 'src/app/store/app.reducer';
import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadSavedChecklistAction } from '../../contracts/store/actions/saved-checklist.action';

@Component({
  selector: 'il-inspections-container',
  templateUrl: './inspections-container.component.html',
  styleUrls: ['./inspections-container.component.scss']
})

export class InspectionsContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
    this.store.dispatch(loadSavedChecklistAction())
  }
}
