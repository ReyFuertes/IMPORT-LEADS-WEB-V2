import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { IActiveInspection } from '../../inspections.models';
import { getInspectionDetailSelector } from '../../store/selectors/inspection.selector';

@Component({
  selector: 'il-inspection-report-inspector',
  templateUrl: './inspection-report-inspector.component.html',
  styleUrls: ['./inspection-report-inspector.component.scss']
})

export class InspectorReportInspectorComponent implements OnInit {
  public $detail: Observable<IActiveInspection>;

  constructor(private store: Store<AppState>) {
    this.$detail = this.store.pipe(select(getInspectionDetailSelector));
  }

  ngOnInit() { }
}
