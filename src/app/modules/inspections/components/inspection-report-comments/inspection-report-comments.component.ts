import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { inspectionOkCommentsReport } from '../../store/actions/inspection-report.action';
import { getInspectionOkCommentsReportSelector } from '../../store/selectors/inspection-report.selector';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewerDialogComponent } from 'src/app/modules/dialogs/components/image-viewer-dialog/image-viewer-dialog.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'il-inspection-report-comments',
  templateUrl: './inspection-report-comments.component.html',
  styleUrls: ['./inspection-report-comments.component.scss']
})

export class InspectionReportCommentsComponent implements OnInit {

  public displayedColumns: string[] = ['num', 'product', 'picture', 'comment'];
  public dataSource: any;
  public apiImagePath: string = environment.apiImagePath;
  public imgPath: string = environment.imgPath;
  public product_failure_count: number = 0;

  constructor(public translateService: TranslateService, private dialog: MatDialog, private route: ActivatedRoute, private store: Store<AppState>) {

    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(inspectionOkCommentsReport({ saved_checklist_id }));
    }
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionOkCommentsReportSelector))
      .subscribe((res: any) => {
        if (res) {
          this.dataSource = res?.data;
          this.product_failure_count = res?.product_failure_count || 0;
        }
      });
  }

  public viewImage(image: string): void {
    const imageViewDialog = this.dialog.open(ImageViewerDialogComponent, { data: { image } });
    imageViewDialog.afterClosed().subscribe(result => { });
  }

  public get getProductFailureCount(): any {
    return this.dataSource?.product_failure_count || 0;
  }

  public getLimitImages(images: any[]): any {
    return images;
  }

  public getImage(image: any): string {
    //return image ? this.apiImagePath + image : `${this.imgPath}no-image.png`;
    return image ? `${this.apiImagePath}${image?.saved_checklist_id}/${image?.filename}` : `${this.imgPath}no-image.png`;
  }
}
