import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { IInspectionRun, InspectionVerificationType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { select, Store } from '@ngrx/store';
import { getInspectionRunSelector } from '../../store/selectors/inspection.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil } from 'rxjs/operators';

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

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionRunSelector))
      .pipe(takeUntil(this.$unsubscribe)).subscribe((res: any) => {
        if (res) this.processItem(res);
      })
  }

  private processItem(inspectionRun: any): void {
    const { terms } = inspectionRun;

    const grouped = _.groupBy(terms, (t: any) => {
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