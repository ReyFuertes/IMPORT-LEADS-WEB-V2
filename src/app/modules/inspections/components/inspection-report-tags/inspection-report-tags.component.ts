import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getTagsReportAction, getTagsReportSuccessAction } from '../../store/actions/inspection-report.action';
import { getTagsReportSelector } from '../../store/selectors/inspection-report.selector';
export interface Tag {
  tag: string;
  failed: number;
  passed: number;
  failureRate: number;
  aQLimit: string;
}

const ELEMENT_DATA: Tag[] = [
  {
    tag: 'Appearance',
    failed: 2,
    passed: 49,
    failureRate: 4,
    aQLimit: 'close',
  },
  {
    tag: 'Materials',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'close',
  },
  {
    tag: 'Packaging',
    failed: 1,
    passed: 50,
    failureRate: 2,
    aQLimit: 'close',
  },
  {
    tag: 'Measurements',
    failed: 3,
    passed: 48,
    failureRate: 6,
    aQLimit: 'close',
  }
];

@Component({
  selector: 'il-inspection-report-tags',
  templateUrl: './inspection-report-tags.component.html',
  styleUrls: ['./inspection-report-tags.component.scss']
})

export class InspectionReportTagsComponent extends GenericDestroyPageComponent implements OnInit {

  public tagHeader: any[]

  public displayedColumns: string[] = ['tag', 'failed', 'passed', 'failureRate'];
  public dataSource: any;
  public totalTags: any;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    super();

    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(getTagsReportAction({ saved_checklist_id }));
    }
  }

  public get getTagsCount(): string {
    return String(this.tagHeader[0]?.total_tags);
  }

  ngOnInit() {
    this.store.pipe(select(getTagsReportSelector),
      takeUntil(this.$unsubscribe))
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res?.tags;
          this.totalTags = String(res?.total_tags);

          const failure_rates = this.dataSource.map(o => o?.failure_rate);
          const totalFailureRate = failure_rates?.reduce((a, c) => { return Number(a) + Number(c) });
          const avgFailureRate = totalFailureRate / failure_rates?.length;
  
          this.tagHeader = [
            { title: 'Total amount of tags', value: this.totalTags },
            { title: 'Average failure rate', value: `${parseFloat(String(Math.abs(avgFailureRate))).toFixed(2)}%` }
          ];
        }
      });
  }
}
