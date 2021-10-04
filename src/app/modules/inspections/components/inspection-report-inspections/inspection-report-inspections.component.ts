import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Color, Label } from 'ng2-charts';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionBarReport } from '../../inspections.models';
import { inspectionBarChartReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionsLineReportSelector } from '../../store/selectors/inspection-report.selector';
import { loadInspectionDetailAction } from '../../store/actions/inspection.action';
import { isPlatformBrowser } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'il-inspection-report-inspections',
  templateUrl: './inspection-report-inspections.component.html',
  styleUrls: ['./inspection-report-inspections.component.scss']
})

export class InspectionReportInspectionComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public barChartData: any[] = [{
    label: "Items",
    lineTension: 0,
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
        barThickness: 2,  // number (pixels) or 'flex'
        maxBarThickness: 2, // number (pixels)
        type: "time",
        ticks: {
          suggestedMin: 0,
          beginAtZero: true,
          fontSize: 12,
        },
        time: {
          format: "HH.mm",
          unit: "hour",
          unitStepSize: 1,
          displayFormats: {
            minute: "HH.mm",
            hour: "HH.mm",
            min: "00:00",
            max: "23:59"
          },
          min: "00:00",
          max: "23:59"
        },
        scaleShowHorizontalLines: false,
        gridLines: {
          tickMarkLength: 15,
          display: false,
          drawBorder: false,
          lineWidth: 0
        },
        barPercentage: 0.5,
        stacked: false,
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
        gridLines: {
          tickMarkLength: 15,
          display: false,
          drawBorder: false,
          lineWidth: 0
        },
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

  public displayedColumns: string[] = ['inspector', 'date', 'duration', 'item'];
  public dataSource: any[];
  public id: string;
  public barChartSummary: IInspectionBarReport;
  public barChartOption: any;
  public isBrowser: boolean;
  public form: FormGroup;
  public locale = 'en';
  public hours = [];
  public barChartRawData: any;
  public filterDate: any;
  public totalInspectionTime: string;

  constructor(public translationService: TranslateService, private fb: FormBuilder, private cdRef: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object, private route: ActivatedRoute, private store: Store<AppState>) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
    this.translationService.setDefaultLang('cn');

    /* load bar report */
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(inspectionBarChartReportAction({ id: this.id }));
      this.store.dispatch(loadInspectionDetailAction({ payload: `?saved_checklist_id=${this.id}` }));
    }

    this.form = this.fb.group({ date: [null] });

    this.store.pipe(select(getInspectionsLineReportSelector),
      takeUntil(this.$unsubscribe)).subscribe((res: IInspectionBarReport) => {
        if (res) {
          this.barChartSummary = Object.assign({}, res);
          this.filterDate = moment(this.barChartSummary?.start_date).format('YYYY-MM-DD');

          const bar_data: any[] = this.filterDataSource(res?.bar_data);

          this.totalInspectionTime = this.addTimes(res?.bar_data?.map(v => v.duration));
          
          this.barChartData[0].data = Object.assign([], bar_data);

          this.dataSource = Object.assign([], res?.table_data);

          this.form.get('date').patchValue(new Date(this.barChartSummary?.start_date), { emitEvent: false });
        }
      });

    this.form.valueChanges.pipe(takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) {
          this.filterDate = moment(new Date(res?.date)).format('YYYY-MM-DD');

          const bar_data = this.filterDataSource(this.barChartSummary?.bar_data);

          this.barChartData[0].data = Object.assign([], bar_data);
        }
      });
  }

  private addTimes(times: any[]) {
    let duration = 0;
    times.forEach(time => {
      duration = duration + moment.duration(time).as('milliseconds')
    });
    return moment.utc(duration).format("HH:mm")
  }

  private filterDataSource(source: any): any {
    return Object.assign([], source)
      ?.filter(bd => moment(bd?.date).format('YYYY-MM-DD') === this.filterDate)
      ?.map(r => {
        return {
          x: moment(r?.date).format('HH.mm'),
          y: r?.count
        }
      });
  }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
