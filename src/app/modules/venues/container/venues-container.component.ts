import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'il-venues-container',
  templateUrl: './venues-container.component.html',
  styleUrls: ['./venues-container.component.scss']
})

export class VenuesContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
