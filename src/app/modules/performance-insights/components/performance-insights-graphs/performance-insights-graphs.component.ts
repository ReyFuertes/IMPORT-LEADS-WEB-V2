import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'il-performance-insights-graphs',
  templateUrl: './performance-insights-graphs.component.html',
  styleUrls: ['./performance-insights-graphs.component.scss']
})
export class PerformanceInsightsGraphsComponent implements OnInit {
  /* amount bar chart */
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
    }
  };
  public barChartPlugins: any;
  public barChartLabels: Label[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '01'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: '',
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: ''
    },
    {
      data: [
        11, 11, 11, 11, 12, 22, 23, 24, 24, 25, 25, 22, 38, 30, 30, 38, 26,
        11, 18, 18, 21, 22, 22, 23, 34, 24, 45, 45, 42, 11, 42
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      label: 'Amount of due'
    }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' }
  ];

  /* Contracts bar chart */
  public barChartOptionsContracts: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
  };

  public barChartLabelsContracts: Label[] = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29', '30', '01'];
  public barChartTypeContracts: ChartType = 'bar';
  public barChartLegendContracts = false;
  public barChartPluginsContracts = [];
  public barChartDataContracts: ChartDataSets[] = [
    {
      data: [
        0.5, 0.5, 0.5, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 2, 2, 2, 4, 4,
        4, 4, 3, 0.5, 1, 1, 1, 2, 2, 3, 3, 1, 1, 1
      ],
      borderWidth: 1,
      borderColor: '#1e8ae6',
      type: 'line',
      order: 0
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      order: 1
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      order: 2
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      order: 3
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      order: 4
    },
    {
      data: [
        1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
        18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2
      ],
      barPercentage: 0.7,
      categoryPercentage: 1,
      order: 5
    }
  ];
  public barChartColorsContracts: Color[] = [
    { backgroundColor: 'rgba(30, 138, 230, 0.4)' },
    { backgroundColor: '#a8e9d5' },
    { backgroundColor: '#a8e9d5' },
    { backgroundColor: '#a8e9d5' },
    { backgroundColor: '#a8e9d5' },
    { backgroundColor: '#a8e9d5' },
  ];

  public items: Array<{ label: string, value?: string }> = [
    {
      label: 'Touch Dimmer Switch',
    },
    {
      label: 'Touch Dimmer Switch > 1G1W 1283',
    }
  ];
  constructor() { }

  ngOnInit() { }

}
