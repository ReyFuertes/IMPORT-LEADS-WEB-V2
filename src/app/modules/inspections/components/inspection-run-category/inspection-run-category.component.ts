import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { IInspectionRun, InspectionVerificationType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { select, Store } from '@ngrx/store';
import { getInspectionRunSelector } from '../../store/selectors/inspection.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil } from 'rxjs/operators';
import { sortByDesc } from 'src/app/shared/util/sort';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-inspection-run-category',
  templateUrl: 'inspection-run-category.component.html',
  styleUrls: ['./inspection-run-category.component.scss']
})

export class InspectionRunCategoryComponent extends GenericDestroyPageComponent implements OnInit {
  public displayedColumns: string[] = ['term_name', 'term_description', 'verification', 'Comments'];
  public dataSource: any;
  public inspectionVeriType = InspectionVerificationType;
  public termVerifications: any[] = [];
  public termVerification: any;

  @Input() public inspectionRun: any;

  constructor(public translateService: TranslateService, private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionRunSelector))
      .pipe(takeUntil(this.$unsubscribe)).subscribe((res: any) => {
        if (res) this.processItem(res);
      });

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }

  public get is_viewing(): boolean {
    return this.inspectionRun?.is_viewing;
  }

  private processItem(inspectionRun: any): void {
    const { terms } = inspectionRun;

    const fmtTerms = terms?.map(t => {
      return {
        ...t,
        inspection_checklist_run: { id: inspectionRun?.id },
        saved_checklist: { id: inspectionRun?.saved_checklist?.id }
      }
    }).sort((a, b) => sortByDesc(a, b, 'position')); //make sure the terms are sorted by position

    const grouped = _.groupBy(fmtTerms, (t: any) => {
      return t?.category?.category_name;
    });

    this.dataSource = Object.keys(grouped)?.map(g => {

      const flattenArr = _.flatten(Object.values(grouped));
      const terms = Object.values(flattenArr).filter(function (itm: any) {
        return g.indexOf(itm?.category?.category_name) > -1;
      });

      return {
        category: { category_name: g },
        terms
      }
    });
  }
}