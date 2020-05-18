import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-performance-insights-quick-wins',
  templateUrl: './performance-insights-quick-wins.component.html',
  styleUrls: ['./performance-insights-quick-wins.component.scss']
})
export class PerformanceInsightsQuickWinsComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public wins: Array<{ label: string, class?: string}> = [
    {
      label: '10% decrease in cat 3 win $10 000',
      class: 'bl_red'
    },
    {
      label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      class: 'bl_yellow'
    },
    {
      label: 'Lorem Ipsum is simply dummy text of the printing industry.',
      class: 'bl_yellow'
    },
    {
      label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      class: 'bl_green'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
