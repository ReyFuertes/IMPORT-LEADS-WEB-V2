import { environment } from './../../../../../environments/environment';
import { AfterViewInit, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { downloadProductionImagesAction } from '../../store/actions/inspection-report.action';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-inspection-report-page',
  templateUrl: './inspection-report-page.component.html',
  styleUrls: ['./inspection-report-page.component.scss']
})

export class InspectionReportPageComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public svgPath: string = environment.svgPath;
  constructor(public translateService: TranslateService, private route: ActivatedRoute, private store: Store<AppState>) {
    super();
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }

  public onDownload(): void {
    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(downloadProductionImagesAction({ saved_checklist_id }));
    }
  }
}
