import { loadVenues } from './../store/venues.action';
import { AppState } from 'src/app/store/app.reducer';
import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'il-venues-container',
  templateUrl: './venues-container.component.html',
  styleUrls: ['./venues-container.component.scss']
})

export class VenuesContainerComponent extends GenericContainer implements OnInit {
  constructor(private store: Store<AppState>) {
    super();
    this.store.dispatch(loadVenues());
  }
}
