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


  public displayedColumns: string[] = ['product', 'failed', 'passed'];
  public dataSource: any;

  public id: string;
  public productData: IInspectionProductReport;
  public barChartOption: any;

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

          const labels: string[] = [];
          let data: any[] = [];
          let _series: any[] = [];
          let count: number = 1;
          let failedTermsCount: any[] = [];
          let passedTermsCount: any[] = [];

          res?.products.forEach(_ => {
            labels.push(`Time: ${_.product?.product_name}`);

            failedTermsCount.push({
              value: _.failedTermsCount,
              itemStyle: { color: '#3273dd' }
            });
            passedTermsCount.push({
              value: _.passedTermsCount,
              itemStyle: { color: '#1b3e76' }
            });
          });

          _series = [{
            name: 'Passed Terms',
            type: 'bar',
            data: passedTermsCount,
            animationDelay: (idx) => idx * 10,
            itemStyle: {
              barBorderRadius: 6
            },
            barMaxWidth: 10
          }, {
            name: 'Failed',
            type: 'bar',
            data: failedTermsCount,
            animationDelay: (idx) => idx * 10,
            itemStyle: {
              barBorderRadius: 6
            },
            barMaxWidth: 10
          }];

          this.dataSource = res?.products;

          this.barChartOption = {
            tooltip: {
              position: 'top',
              trigger: 'axis',
              axisPointer: {
                type: 'none'
              },
            },
            xAxis: {
              axisLine: { show: false },
              data: labels,
              silent: false,
              splitLine: { show: false },
            },
            yAxis: {
              axisTick: { show: false },
              splitNumber: 4,
              axisLine: { show: false },
            },
            series: _series,
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5
          };


        }
      });
  }
}

