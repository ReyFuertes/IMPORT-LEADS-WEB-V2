import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { CHARTBGCOLOR, CHARTBORDERCOLOR } from 'src/app/shared/constants/chart';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport } from '../../inspections.models';
import { inspectionBarReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionbarReportSelector } from '../../store/selectors/inspection-report.selector';

export interface Inspection {
  inspector: string;
  date: string;
  duration: string;
  items: number;
  average: string;
}

const ELEMENT_DATA: Inspection[] = [
  {
    inspector: 'nmy Li | CIL China | Procurement officer',
    date: '06.10.2019',
    duration: '00.04.10',
    items: 26,
    average: '00:04:10'
  },
  {
    inspector: 'nmy Li | CIL China | Procurement officer',
    date: '09.10.2019',
    duration: '19.04.10',
    items: 11,
    average: '00:04:10'
  },
  {
    inspector: 'nmy Li | CIL China | Procurement officer',
    date: '12.10.2019',
    duration: '00.04.10',
    items: 12,
    average: '02:04:10'
  },
  {
    inspector: 'nmy Li | CIL China | Procurement officer',
    date: '19.10.2019',
    duration: '02.04.10',
    items: 18,
    average: '00:04:10'
  },
  {
    inspector: 'nmy Li | CIL China | Procurement officer',
    date: '26.10.2019',
    duration: '08.04.10',
    items: 15,
    average: '08:04:10'
  },
];

@Component({
  selector: 'il-inspection-report-inspections',
  templateUrl: './inspection-report-inspections.component.html',
  styleUrls: ['./inspection-report-inspections.component.scss']
})

export class InspectionReportInspectionComponent implements OnInit {
  public insChartOptions = {
    legend: {
      display: false
    },
    animation: {
      duration: 2000,
    },
  };
  public barChartData: any;

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
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartLabels: Label[] = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
    '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32',
    '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
    '44', '45', '46', '47', '48'];
  public barChartLegend = false;
  public barChartPlugins = [];
  // public barChartData: ChartDataSets[] = [{
  //   data: [
  //     1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
  //     18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2, 5, 5, 6,
  //     10, 11, 12, 21, 12, 12, 12, 13, 14, 4, 4, 8, 14, 11, 14
  //   ],
  //   label: '',
  //   barPercentage: 0.7,
  //   categoryPercentage: 1
  // }, {
  //   data: [
  //     1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
  //     18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2, 5, 5, 6,
  //     10, 11, 12, 21, 12, 12, 12, 13, 14, 4, 4, 8, 14, 11, 14
  //   ],
  //   label: '',
  //   barPercentage: 0.7,
  //   categoryPercentage: 1
  // }, {
  //   data: [
  //     1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 2, 18, 20, 20, 18, 6,
  //     18, 18, 18, 1, 2, 2, 3, 4, 4, 5, 5, 2, 1, 2, 5, 5, 6,
  //     10, 11, 12, 21, 12, 12, 12, 13, 14, 4, 4, 8, 14, 11, 14
  //   ],
  //   label: '',
  //   barPercentage: 0.7,
  //   categoryPercentage: 1
  // }];
  public barChartColors: Color[] = [
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
    { backgroundColor: '#f48a69' },
  ];

  public displayedColumns: string[] = ['inspector', 'date', 'duration', 'item', 'average'];
  public dataSource = ELEMENT_DATA;

  public id: string;
  public $barChart: Observable<IInspectionBarReport[]>;
  public barChartSummary: IInspectionBarReport;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    /* load bar report */
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(inspectionBarReportAction({ id: this.id }));
    }

    this.store.pipe(select(getInspectionbarReportSelector)).subscribe((res: IInspectionBarReport) => {
      if (res) {
        const labels: string[] = [];
        let data: any[] = [];

        res?.inspections.forEach(_ => {
          labels.push(_.runStart);
          data.push(_.runTime.time);
        });

        this.barChartSummary = {
          itemCount: res?.itemCount,
          totalRuntime: res?.totalRuntime,
          runStart: res?.runStart,
          runEnd: res?.runEnd
        }

        this.barChartData = {
          labels,
          datasets: [{
            backgroundColor: CHARTBGCOLOR,
            borderColor: CHARTBORDERCOLOR,
            borderWidth: 1,
            data
          }]
        }
      }
    })
  }

  ngOnInit() { }
}
