import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { getInspectorReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionInspectorSelector } from '../../store/selectors/inspection-report.selector';
@Component({
  selector: 'il-inspection-report-inspector',
  templateUrl: './inspection-report-inspector.component.html',
  styleUrls: ['./inspection-report-inspector.component.scss']
})

export class InspectorReportInspectorComponent implements OnInit {
  public $detail: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    const id = this.route.snapshot.paramMap.get('id') || null;
    if (id) {
      this.store.dispatch(getInspectorReportAction({ id }))
    }
  }

  ngOnInit() {
    this.$detail = this.store.pipe(select(getInspectionInspectorSelector));
  }
}
