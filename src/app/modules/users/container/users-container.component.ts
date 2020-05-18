import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss']
})

export class UsersContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
