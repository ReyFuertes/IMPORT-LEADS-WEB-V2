import { Component, OnInit } from '@angular/core';
import { GenericContainer } from 'src/app/shared/generics/generic-container';

@Component({
  selector: 'il-user-management-container',
  templateUrl: './user-management-container.component.html',
  styleUrls: ['./user-management-container.component.scss']
})
export class UserManagementContainerComponent extends GenericContainer {
  constructor() {
    super();
  }
}
