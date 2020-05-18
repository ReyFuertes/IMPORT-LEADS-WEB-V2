import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-inspection-insights',
  templateUrl: './inspection-insights-container.component.html',
  styleUrls: ['./inspection-insights-container.component.scss']
})

export class InspectionInsightsContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
