import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'il-view-permission-container',
  templateUrl: './view-permission-container.component.html',
  styleUrls: ['./view-permission-container.component.scss']
})
export class ViewPermissionContainerComponent extends GenericContainer {
  constructor(private store: Store<AppState>) {
    super();
  }
}