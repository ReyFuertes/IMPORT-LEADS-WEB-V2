import { AddEditState, ISimpleItem } from '../../../../shared/generics/generic.model';
import { InspectionRunCommentDialogComponent } from '../../../dialogs/components/inspection-run-comment/inspection-run-comment-dialog.component';
import { InspectionCommentDialogComponent } from '../../../dialogs/components/inspection-comments/inspection-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { IInspectionRun, InspectionVeriType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store } from '@ngrx/store';
import { updateSourceTermAction } from '../../store/inspection.action';
import { IContractTerm } from 'src/app/modules/contracts/contract.model';

@Component({
  selector: 'il-inspection-run-category-row',
  templateUrl: './inspection-run-category-row.component.html',
  styleUrls: ['./inspection-run-category-row.component.scss']
})

export class InspectionRunCategoryRowComponent implements OnInit, OnChanges {
  public verifOptions: ISimpleItem[] = [
    { label: 'Ok', value: 'ok' },
    { label: 'Failed', value: 'failed' },
    { label: 'Comment', value: 'comment' }
  ];
  public inspectionVeriType = InspectionVeriType;

  @Input() public row: IContractTerm;
  public term: IContractTerm;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  public onRemarks(event: any): void {
    console.log(event)
  }

  public isVerified(verification: string): boolean {
    return verification !== null && verification !== this.inspectionVeriType?.ok
  }

  public handleSelOption(option: ISimpleItem, item: IContractTerm): void {
    const prevSelection = Object.assign({}, item, { verification: item.verification });
  
    if (option.label !== 'Ok') {
      const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {});
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.row.verification = option.value;
        } else {
          this.row.verification = null;
          setTimeout(() => {
            this.row.verification = prevSelection.verification
          });
        }
        this.cdRef.detectChanges();
      });
    } else {
      this.row.verification = option.value;
    }
  }

  public showComment(): void {
    const dialogRef = this.dialog.open(InspectionRunCommentDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe();
  }
}



