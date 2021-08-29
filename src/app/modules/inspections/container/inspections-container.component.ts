import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'il-inspections-container',
  templateUrl: './inspections-container.component.html',
  styleUrls: ['./inspections-container.component.scss']
})

export class InspectionsContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
