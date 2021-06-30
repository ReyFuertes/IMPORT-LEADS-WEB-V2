import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { IInspectionProductReport } from '../../inspections.models';
import { inspectionProductsReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionProductReportSelector } from '../../store/selectors/inspection-report.selector';

@Component({
  selector: 'il-inspection-report-products',
  templateUrl: './inspection-report-products.component.html',
  styleUrls: ['./inspection-report-products.component.scss']
})

export class InspectionReportProductsComponent extends GenericDestroyPageComponent implements OnInit {
  public productHeader: any[] = [
    { title: 'Total items', value: '58' },
    { title: 'Failed items', value: '12' },
    { title: 'Pass Items', value: '46' }
  ];

  public displayedColumns: string[] = ['product', 'failed', 'passed', 'failure_rate'];
  public dataSource: any;

  public productData: IInspectionProductReport;
  public barChartOption: any;

  constructor(public translateService: TranslateService, private store: Store<AppState>, private route: ActivatedRoute) {
    super();

    const id = this.route.snapshot.paramMap.get('id') || null;
    if (id) {
      this.store.dispatch(inspectionProductsReportAction({ id }))
    }
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionProductReportSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) {
          this.dataSource = res;
        }
      });

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }
}

