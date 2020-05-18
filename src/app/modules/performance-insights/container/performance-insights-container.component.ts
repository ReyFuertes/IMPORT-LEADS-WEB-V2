import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-performance-insights-container',
  templateUrl: './performance-insights-container.component.html',
  styleUrls: ['./performance-insights-container.component.scss']
})

export class PerformanceInsightsComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
