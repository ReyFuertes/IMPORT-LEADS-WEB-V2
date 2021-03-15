import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { downloadProductionImagesAction } from '../../store/actions/inspection-report.action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'il-inspection-report-page',
  templateUrl: './inspection-report-page.component.html',
  styleUrls: ['./inspection-report-page.component.scss']
})

export class InspectionReportPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
  }

  ngOnInit() { }

  public onDownload(): void {
    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(downloadProductionImagesAction({ saved_checklist_id }));
    }
  }
}
