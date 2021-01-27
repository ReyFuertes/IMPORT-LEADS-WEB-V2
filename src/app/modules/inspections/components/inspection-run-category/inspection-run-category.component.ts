import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { IInspectionRun, InspectionVerificationType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'il-inspection-run-category',
  templateUrl: 'inspection-run-category.component.html',
  styleUrls: ['./inspection-run-category.component.scss']
})

export class InspectionRunCategoryComponent implements OnInit, OnChanges {
  public displayedColumns: string[] = ['term_name', 'term_description', 'verification', 'Comments'];
  public dataSource: any;
  public inspectionVeriType = InspectionVerificationType;
  public termVerifications: any[] = [];
  public termVerification: any;

  @Input() public inspectionRun: any;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {
    this.processItem();
  }

  ngOnChanges(): void {
    this.processItem();
  }

  private processItem(): void {
    const { inspection_checklist_product } = this.inspectionRun;
    
    const source = [{
      id: inspection_checklist_product?.contract_category?.id,
      category: inspection_checklist_product?.category?.category_name,
      saved_checklist: { id: this.inspectionRun?.checklist.id },
      contract_product: inspection_checklist_product?.contract_product,
      contract_category: inspection_checklist_product?.contract_category,
    }];

    
    this.dataSource = source && Object.values(source?.reduce((result,
      { id, saved_checklist, category, contract_category, contract_product }) => {
      if (!result[category]) result[category] = { /* Create new group */
        id,
        saved_checklist,
        category,
        contract_product,
        contract_category,
        terms: []
      };
      result[category].terms.push(...inspection_checklist_product?.terms);
      return result;
    }, {}));
  }
}