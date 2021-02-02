import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Color, Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport, IInspectionReportItem } from '../../inspections.models';
import { inspectionBarReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionsLineReportSelector } from '../../store/selectors/inspection-report.selector';
import { loadInspectionDetailAction } from '../../store/actions/inspection.action';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-inspection-report-inspections',
  templateUrl: './inspection-report-inspections.component.html',
  styleUrls: ['./inspection-report-inspections.component.scss']
})

export class InspectionReportInspectionComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public barChartData: any[] = [{
    label: "Inspections",
    lineTension: 0,
    fillOpacity: 0.3,
    pointRadius: 5,
    pointHoverRadius: 5,
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(151,187,205,1)"
  }];
  public barChartLabels: Label[];
  public barChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        maxBarThickness: 20,
        type: "time",
        ticks: {
          suggestedMin: 0,
          beginAtZero: true,
          fontSize: 12,
        },
        time: {
          format: "HH:mm",
          unit: "minute",
          unitStepSize: 0.5,
          displayFormats: {
            minute: "HH:mm",
            hour: "HH:mm",
            min: "00:00",
            max: "23:59"
          }
        },
        scaleShowHorizontalLines: true,
        gridLines: {
          tickMarkLength: 15,
          display: false,
          drawBorder: false
        },
        barPercentage: 2.0,
        categoryPercentage: 2.0,
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    maintainAspectRatio: false,

  };
  public barChartColors: Color[] = [{
    borderColor: "#1b3e76",
    backgroundColor: "rgba(50,115,221,1)"
  }];
  public barChartLegend = true;
  public barChartType = "bar";
  public barChartPlugins = [];

  public displayedColumns: string[] = ['inspector', 'date', 'duration', 'item', 'average'];
  public dataSource: any[];
  public id: string;
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
          const bar_data = res?.bar_data?.map(r => {
            return {
              x: new Date(r?.date),
              y: r?.count
            }
          });
          this.barChartData[0].data = bar_data;
          this.barChartSummary = res;
          this.dataSource = res?.bar_data;
          console.log(res?.bar_data)
        }
      });
  }

  ngOnInit() {
    // moment.locale(this.locale); // optional - can remove if you are only dealing with one locale
    // for (let hour = 0; hour < 24; hour++) {
    //   this.hours.push(moment({ hour }).format("HH:mm"));
    //   this.hours.push(
    //     moment({
    //       hour,
    //       minute: 30
    //     }).format("HH:mm")
    //   );
    // }
  }

  ngAfterViewInit(): void {

    this.cdRef.detectChanges();
  }
}
