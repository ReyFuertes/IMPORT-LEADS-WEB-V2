import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { inspectionOkCommentsReport } from '../../store/actions/inspection-report.action';
import { getInspectionOkCommentsReportSelector } from '../../store/selectors/inspection-report.selector';
import * as _ from 'lodash';
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

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    const saved_checklist_id = this.route.snapshot.paramMap.get('id') || null;
    if (saved_checklist_id) {
      this.store.dispatch(inspectionOkCommentsReport({ saved_checklist_id }));
    }
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionOkCommentsReportSelector))
      .subscribe(res => {
        if (res) 
          this.dataSource = res;
      });
  }

  public get getProductCommentCount(): any {
    return _.sumBy(this.dataSource, function (f) {
      return f.count;
    });
  }

  public getLimitImages(images: any[]): any {
    return images?.slice(0, 3);
  }

  public getImage(image: string): string {
    return image ? this.apiImagePath + image : `${this.imgPath}no-image.png`;
  }
}
