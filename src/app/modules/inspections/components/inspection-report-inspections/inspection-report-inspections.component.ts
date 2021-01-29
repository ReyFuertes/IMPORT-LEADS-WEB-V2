import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { CHARTBGCOLOR, CHARTBORDERCOLOR } from 'src/app/shared/constants/chart';
import { AppState } from 'src/app/store/app.reducer';
import { IActiveInspection, IInspectionBarReport, IInspectionReportItem } from '../../inspections.models';
import { inspectionBarReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionsLineReportSelector } from '../../store/selectors/inspection-report.selector';
import { loadInspectionDetailAction } from '../../store/actions/inspection.action';
import { getInspectionDetailSelector } from '../../store/selectors/inspection.selector';
import { isPlatformBrowser } from '@angular/common';
import 'src/styleguide/echarts-theme.js';
import { getInstanceByDom, connect } from 'echarts';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

export interface Inspection {
  inspector: string;
  date: string;
  duration: string;
  items: number;
  average: string;
}

@Component({
  selector: 'il-inspection-report-inspections',
  templateUrl: './inspection-report-inspections.component.html',
  styleUrls: ['./inspection-report-inspections.component.scss']
})

export class InspectionReportInspectionComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public lineChartData: any[] = [{
    label: "Inspections",
    data: [
      { x: new Date("2021-01-27T16:35"), y: 3 },
      { x: new Date("2021-01-27T16:35"), y: 2 },
      { x: new Date("2021-01-27T16:33"), y: 4 },
      { x: new Date("2021-01-27T16:32"), y: 2 },
      { x: new Date("2021-01-27T14:31"), y: 6 },
      { x: new Date("2021-01-27T14:30"), y: 2 },
      { x: new Date("2021-01-27T14:29"), y: 2 },
      { x: new Date("2021-01-27T14:27"), y: 1 }
    ],
    lineTension: 0,
    fillOpacity: 0.3,
    pointRadius: 5,
    pointHoverRadius: 5,
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)",
  }];
  public lineChartLabels: Label[];
  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: "time",
        time: {
          format: "HH:mm",
          unit: "minute",
          unitStepSize: 1,
          displayFormats: {
            minute: "HH:mm",
            hour: "HH:mm",
            min: "00:00",
            max: "23:59"
          }
        },
        scaleShowHorizontalLines: true,
        gridLines: {
          tickMarkLength: 15
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    maintainAspectRatio: false,
  };
  public lineChartColors: Color[] = [{
    borderColor: "#1b3e76",
    backgroundColor: "rgba(50,115,221,0.3)"
  }];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];


  public barChartData: any;
  public barChartLegend = false;
  public displayedColumns: string[] = ['inspector', 'date', 'duration', 'item', 'average'];
  public dataSource: IInspectionReportItem[];
  public id: string;
  public $barChart: Observable<IInspectionBarReport[]>;
  public barChartSummary: IInspectionBarReport;
  public barChartOption: any;
  public isBrowser: boolean;

  public locale = 'en';
  public hours = [];

  constructor(private cdRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object, private route: ActivatedRoute, private store: Store<AppState>) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);

    /* load bar report */
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(inspectionBarReportAction({ id: this.id }));
      this.store.dispatch(loadInspectionDetailAction({ params: `?saved_checklist_id=${this.id}` }));
    }

    this.store.pipe(select(getInspectionsLineReportSelector),
      takeUntil(this.$unsubscribe)).subscribe((res: IInspectionBarReport) => {
        if (res) {
          console.log(res)
        }
      });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {

    this.cdRef.detectChanges();
  }
}
