import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label, Color } from 'ng2-charts';

export interface Tag {
  tag: string;
  failed: number;
  passed: number;
  failureRate: number;
  aQLimit: string;
}

const ELEMENT_DATA: Tag[] = [
  {
    tag: 'Appearance',
    failed: 2,
    passed: 49,
    failureRate: 4,
    aQLimit: 'close',
  },
  {
    tag: 'Materials',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'close',
  },
  {
    tag: 'Packaging',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'close',
  },
  {
    tag: 'Measurements',
    failed: 3,
    passed: 48,
    failureRate: 6,
    aQLimit: 'close',
  }
];

@Component({
  selector: 'il-inspection-report-tags',
  templateUrl: './inspection-report-tags.component.html',
  styleUrls: ['./inspection-report-tags.component.scss']
})

export class InspectionReportTagsComponent implements OnInit {

  public tagHeader: any[] = [
    { title: 'Total amount of tags', value: '4' },
    { title: 'Average failure rate', value: '5%' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              stepSize: 10
          }
      }],
      xAxes: [{
        gridLines: {
            display: false
        }
      }],
    }
  };
  public barChartLabels: Label[] = ['Apperance', 'Materials', 'Measurements', 'Packaging'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [49, 50, 48, 50], categoryPercentage: 0.3, label: 'Passsed Items' },
    { data: [2, 1, 1, 3], categoryPercentage: 0.3, label: 'Failed Items' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#c4e3c8' },
    { backgroundColor: '#b23535' },
  ];

  public graphData = [
    {
      dataConsume: 4,
      dataRemaining: 96,
      percent: 4
    },
    {
      dataConsume: 2,
      dataRemaining: 92,
      percent: 2
    },
    {
      dataConsume: 6,
      dataRemaining: 94,
      percent: 6
    },
    {
      dataConsume: 2,
      dataRemaining: 98,
      percent: 2
    }
  ];

  public displayedColumns: string[] = ['tag', 'failed', 'passed', 'failureRate', 'aQLimit'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {

   }

}
