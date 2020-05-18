import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-inspection-report-page',
  templateUrl: './inspection-report-page.component.html',
  styleUrls: ['./inspection-report-page.component.scss']
})

export class InspectionReportPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor() { }

  ngOnInit() { }
}
