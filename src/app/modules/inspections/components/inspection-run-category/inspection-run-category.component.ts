import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IInspectionRun, InspectionVeriType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'il-inspection-run-category',
  templateUrl: './inspection-run-category.component.html',
  styleUrls: ['./inspection-run-category.component.scss']
})

export class InspectionRunCategoryComponent implements OnInit {
  public displayedColumns: string[] = ['term_name', 'term_description', 'verification', 'remarks'];
  public dataSource: any[];
  public inspectionVeriType = InspectionVeriType;
  public termVerifications: any[] = [];
  public termVerification: any;

  @Input() public item: IInspectionRun;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {
    let source = this.item?.saved_checklist?.checklist_items.map(i => {
      return {
        category: i.contract_category.category.category_name,
        terms: Object.assign({}, i.contract_term, {
          verification: i.contract_term?.verification ? i.contract_term.verification : this.inspectionVeriType.ok
        })
      }
    }) || null;

    this.dataSource = Object.values(source.reduce((result, { category, terms, }) => {
      if (!result[category]) result[category] = { /* Create new group */
        category,
        terms: []
      };
      result[category].terms.push({ ...terms });
      return result;
    }, {}));

  }
}



