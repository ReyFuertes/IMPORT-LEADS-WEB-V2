import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

export interface Notable {
  item: string;
  product: string;
  appearance: string;
  materials: string;
  measurements: string;
  packaging: string;
  comments: string;
}


const ELEMENT_DATA: Notable[] = [
  {
    item: '2',
    product: 'Lasergun > Green',
    appearance: 'close',
    materials: 'close',
    measurements: 'check',
    packaging: 'close',
    comments: 'is not sandal one, is different model.'
  },
  {
    item: '4',
    product: 'Lasergun > Blue',
    appearance: 'close',
    materials: 'close',
    measurements: 'check',
    packaging: 'close',
    comments: 'is not sandal one, is different model.'
  },
  {
    item: '5',
    product: 'Lasergun > Orange',
    appearance: 'close',
    materials: 'check',
    measurements: 'close',
    packaging: 'close',
    comments: 'is not sandal one, is different model.'
  },
  {
    item: '8',
    product: 'Lasergun > Yellow',
    appearance: 'close',
    materials: 'check',
    measurements: 'close',
    packaging: 'close',
    comments: 'is not sandal one, is different model.'
  }
];

@Component({
  selector: 'il-inspection-report-notable-items',
  templateUrl: './inspection-report-notable-items.component.html',
  styleUrls: ['./inspection-report-notable-items.component.scss']
})

export class InspectionReportNotableItemsComponent implements OnInit {

  public notableHeader: any[] = [
    { title: 'Notable Items', value: '4' },
    { title: 'Lasergun > Green', value: '2' },
    { title: 'Lasergun > Blue', value: '6'},
    { title: 'Lasergun > Orange', value: '3'},
    { title: 'Lasergun > Yellow', value: '5'}
  ];

  public doughnutChartLabels: Label[] = ['Lasergun > Green', 'Lasergun > Blue', 'Lasergun > Orange', 'Lasergun > Yellow'];
  public doughnutChartData: MultiDataSet = [
    [13, 17, 30, 40],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions = {
    responsive: true,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 60,
    maintainAspectRatio: false
  };
  public pieChartColors: Color[] = [
    { backgroundColor: ['#c4e3c8', '#b5daba', '#a8cfad', '#b23434'] },
  ];

  public doughnutChartLabelsPF: Label[] = ['Passed items', 'Failed items'];
  public doughnutChartDataPF: MultiDataSet = [
    [46, 12],
  ];
  public doughnutChartTypePF: ChartType = 'doughnut';
  public doughnutChartOptionsPF = {
    responsive: true,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 60,
    maintainAspectRatio: false
  };
  public pieChartColorsPF: Color[] = [
    { backgroundColor: ['#c4e2c7', '#b23434'] },
  ];

  public displayedColumns: string[] = ['item', 'product', 'appearance', 'materials', 'measurements', 'packaging', 'comments'];
  public dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit() { }
}
