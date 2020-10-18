import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionProductReport } from '../../inspections.models';
import { inspectionProductReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionProductReportSelector } from '../../store/selectors/inspection-report.selector';

export interface Product {
  product: string;
  failed: number;
  passed: number;
}

const ELEMENT_DATA: Product[] = [
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  },
  {
    product: 'Lazergun > Green',
    failed: 2,
    passed: 28
  }
];

@Component({
  selector: 'il-inspection-report-products',
  templateUrl: './inspection-report-products.component.html',
  styleUrls: ['./inspection-report-products.component.scss']
})

export class InspectionReportProductsComponent implements OnInit {

  public productHeader: any[] = [
    { title: 'Total items', value: '58' },
    { title: 'Failed items', value: '12' },
    { title: 'Pass Items', value: '46' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 85,
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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];

  public barChartColors: Color[] = [
    { backgroundColor: '#c4e3c8' },
    { backgroundColor: '#b23535' },
  ];

  public displayedColumns: string[] = ['product', 'failed', 'passed'];
  public dataSource: any;

  public id: string;
  public productData: IInspectionProductReport;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(inspectionProductReportAction({ id: this.id }));
    }
  }

  ngOnInit() {
    /* get products reports */
    this.store.pipe(select(getInspectionProductReportSelector))
      .subscribe(res => {
        if (res) {
          this.productData = res;
          this.dataSource = res?.products;

          const failedData = res?.products.map(p => p.failedTermsCount);
          const passedData = res?.products.map(p => p.passedTermsCount);

          this.barChartLabels = res?.products.map(p => {
            return 'Passed Item Failed Item';
          });

          this.barChartData.push({
            data: failedData,
            categoryPercentage: 0.3,
            label: 'Passed Items'
          }, {
            data: passedData,
            categoryPercentage: 0.3,
            label: 'Failed Items'
          })

        }
      });
  }
}

