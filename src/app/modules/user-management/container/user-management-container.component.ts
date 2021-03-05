import { Component, OnInit } from '@angular/core';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { Store } from '@ngrx/store';
import { AppState } from '../../contracts/store/reducers';
import { loadAllUsersAction } from '../store/user-mgmt.actions';

@Component({
  selector: 'il-user-management-container',
  templateUrl: './user-management-container.component.html',
  styleUrls: ['./user-management-container.component.scss']
})
export class UserManagementContainerComponent extends GenericContainer {
  constructor(private store: Store<AppState>) {
    super();
  }
}
