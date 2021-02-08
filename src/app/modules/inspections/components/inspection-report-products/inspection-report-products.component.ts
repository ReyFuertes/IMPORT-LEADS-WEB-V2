import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { AppState } from 'src/app/store/app.reducer';
import { IInspectionProductReport } from '../../inspections.models';
import { inspectionProductsReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionProductReportSelector } from '../../store/selectors/inspection-report.selector';

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

  public productData: IInspectionProductReport;
  public barChartOption: any;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id') || null;
    if (id) {
      this.store.dispatch(inspectionProductsReportAction({ id }))
    }
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionProductReportSelector))
      .subscribe(res => {
        if (res) {
          this.productData = res;
          this.dataSource = res?.products;
        }
      });
  }
}

