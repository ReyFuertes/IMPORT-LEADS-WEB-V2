import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { getInspectionFailedCommentsReportAction } from '../../store/actions/inspection-report.action';
import { getInspectionFailedCommentsReportSelector } from '../../store/selectors/inspection-report.selector';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerDialogComponent } from 'src/app/modules/dialogs/components/image-viewer-dialog/image-viewer-dialog.component';

@Component({
  selector: 'il-inspection-report-failures',
  templateUrl: './inspection-report-failures.component.html',
  styleUrls: ['./inspection-report-failures.component.scss']
})

export class InspectionReportFailuresComponent extends GenericDestroyPageComponent implements OnInit {

  public displayedColumns: string[] = ['num', 'product', 'picture', 'comment'];
  public dataSource: any;
  public apiImagePath: string = environment.apiImagePath;
  public imgPath: string = environment.imgPath;

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private store: Store<AppState>) {
    super();

    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(getInspectionFailedCommentsReportAction({ saved_checklist_id }));
    }
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionFailedCommentsReportSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) this.dataSource = res;
      });
  }

  public viewImage(image: string): void {
    const imageViewDialog = this.dialog.open(ImageViewerDialogComponent, { data: { image } });
    imageViewDialog.afterClosed().subscribe(result => { });
  }

  public get getProductFailureCount(): any {
    const len = this.dataSource?.length;
    const ret = _.sumBy(this.dataSource, function (f) {
      return f.count;
    }) || 0;
    return ret / len;
  }

  public getLimitImages = (images: any[]): any => images;

  public getImage(image: any): string {
    return image ? `${this.apiImagePath}${image?.saved_checklist_id}/${image?.filename}` : `${this.imgPath}no-image.png`;
  }
}
