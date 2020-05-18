import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-performance-insights-expansion-list',
  templateUrl: './performance-insights-expansion-list.component.html',
  styleUrls: ['./performance-insights-expansion-list.component.scss']
})
export class PerformanceInsightsExpansionListComponent implements OnInit {
  @Input()
  public items: string[];

  constructor() { }

  ngOnInit() {
  }

}
