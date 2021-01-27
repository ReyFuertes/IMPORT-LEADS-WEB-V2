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
import { getInspectionbarReportSelector } from '../../store/selectors/inspection-report.selector';
import { loadInspectionDetailAction } from '../../store/actions/inspection.action';
import { getInspectionDetailSelector } from '../../store/selectors/inspection.selector';
import { isPlatformBrowser } from '@angular/common';
import 'src/styleguide/echarts-theme.js';
import { getInstanceByDom, connect } from 'echarts';
import * as moment from 'moment';

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

export class InspectionReportInspectionComponent implements OnInit, AfterViewInit {

  public lineChartData: ChartDataSets[] = [
    {
      data: [7, 5, 5, 6, 9, 6, 2, 3, 1],
      lineTension: 0,
      label: 'Inspection Item/s'
    }
  ];
  public lineChartLabels: Label[];

  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "#1b3e76",
      backgroundColor: "rgba(50,115,221,0.3)"
    }
  ];
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
    this.isBrowser = isPlatformBrowser(platformId);


    this.lineChartLabels = ['5:01', '5:05', '5:11', '6:13', '6:17', '6:22', '6:26'];

    /* load bar report */
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(inspectionBarReportAction({ id: this.id }));
      this.store.dispatch(loadInspectionDetailAction({ params: `?saved_checklist_id=${this.id}` }));
    }

    this.store.pipe(select(getInspectionbarReportSelector)).subscribe((res: IInspectionBarReport) => {
      if (res) {
        console.log(res)
      }
    });

    /* get bar chart reports */
    // this.store.pipe(select(getInspectionbarReportSelector)).subscribe((res: IInspectionBarReport) => {
    //   if (res) {
    //     const labels: string[] = [];
    //     let data: any[] = [];
    //     let _series: any[] = [];
    //     let count: number = 1;

    //     this.barChartSummary = {
    //       totalItemsCheck: res?.totalItemsCheck,
    //       totalTimeInspection: res?.totalTimeInspection,
    //       runStartdate: res?.runStartdate,
    //       runEnddate: res?.runEnddate,
    //     }

    //     res?.inspections.forEach(_ => {
    //       count++;
    //       labels.push(`Total time: ${_.totalRuntime}`);
    //       data.push({
    //         value: _.itemCount,
    //         itemStyle: { color: count % 2 == 0 ? '#1b3e76' : '#3273dd' },
    //       });
    //     });

    //     this.dataSource = res?.inspections;

    //     _series.push({
    //       name: 'Item Count: ',
    //       type: 'bar',
    //       data,
    //       animationDelay: (idx) => idx * 10,
    //       itemStyle: {
    //         barBorderRadius: 6
    //       },
    //       barMaxWidth: 10
    //     })

    //     this.barChartOption = {
    //       tooltip: {
    //         position: 'top',
    //         trigger: 'axis',
    //         axisPointer: {
    //           type: 'none'
    //         },
    //       },
    //       xAxis: {
    //         axisLine: { show: false },
    //         data: labels,
    //         silent: false,
    //         splitLine: { show: false },
    //       },
    //       yAxis: {
    //         axisTick: { show: false },
    //         splitNumber: 4,
    //         axisLine: { show: false },
    //       },
    //       series: _series,
    //       animationEasing: 'elasticOut',
    //       animationDelayUpdate: (idx) => idx * 5
    //     };
    //   }
    // });



  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.cdRef.detectChanges();
  }
}
