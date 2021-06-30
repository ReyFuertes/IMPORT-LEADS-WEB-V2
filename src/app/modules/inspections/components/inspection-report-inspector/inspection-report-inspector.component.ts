import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { getInspectorReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionInspectorSelector } from '../../store/selectors/inspection-report.selector';
@Component({
  selector: 'il-inspection-report-inspector',
  templateUrl: './inspection-report-inspector.component.html',
  styleUrls: ['./inspection-report-inspector.component.scss']
})

export class InspectorReportInspectorComponent extends GenericDestroyPageComponent implements OnInit {
  public $detail: Observable<any>;

  constructor(public translateService: TranslateService, private route: ActivatedRoute, private store: Store<AppState>) {
    super();
    const id = this.route.snapshot.paramMap.get('id') || null;
    if (id) {
      this.store.dispatch(getInspectorReportAction({ id }))
    }
  }

  ngOnInit() {
    this.$detail = this.store.pipe(select(getInspectionInspectorSelector));

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }
}
