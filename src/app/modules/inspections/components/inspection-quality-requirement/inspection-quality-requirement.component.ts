import { AddEditState } from './../../../../shared/generics/generic.model';
import { InspectionRunCommentDialogComponent } from './../../../dialogs/components/inspection-run-comment/inspection-run-comment-dialog.component';
import { InspectionCommentDialogComponent } from './../../../dialogs/components/inspection-comments/inspection-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  id?: number,
  conditions: string;
  position: number;
  verification: Array<{ label: string, value: boolean }>;
  remarks: string;
}

@Component({
  selector: 'il-inspection-quality-requirement',
  templateUrl: './inspection-quality-requirement.component.html',
  styleUrls: ['./inspection-quality-requirement.component.scss']
})

export class InspectionQualityRequirementComponent implements OnInit {
  public displayedColumns: string[] = ['position', 'conditions', 'verification', 'remarks'];
  public dataSource: PeriodicElement[] = [
    {
      id: 1, position: 1, conditions: 'All parts shall be in color and materials as shown in the quotation.',
      verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
      remarks: ''
    },
    {
      id: 2, position: 2, conditions: 'No bad physical condition.',
      verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
      remarks: ''
    },
    {
      id: 3, position: 3, conditions: 'No damages, cracks or scratches.',
      verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
      remarks: ''
    },
    {
      id: 4, position: 4, conditions: 'No bad physical condition.',
      verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
      remarks: ''
    },
    {
      id: 5, position: 5, conditions: 'No damages, cracks or scratches.',
      verification: [{ label: 'Ok', value: true }, { label: 'Failed', value: false }, { label: 'Comment', value: false }],
      remarks: ''
    },
  ];;
  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  public onRemarks(items: PeriodicElement, idx: number): void {
    items && items.verification.forEach((item, i) => {
      if (i === idx) item.value = true
      else item.value = false;
    });
    if(idx === 0) return;
    const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

  private updateData(): void {

  }

  public showComment(): void {
    const dialogRef = this.dialog.open(InspectionRunCommentDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe();
  }
}
