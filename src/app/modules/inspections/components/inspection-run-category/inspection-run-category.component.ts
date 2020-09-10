import { AddEditState, ISimpleItem } from '../../../../shared/generics/generic.model';
import { InspectionRunCommentDialogComponent } from '../../../dialogs/components/inspection-run-comment/inspection-run-comment-dialog.component';
import { InspectionCommentDialogComponent } from '../../../dialogs/components/inspection-comments/inspection-comments-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { IInspectionRun } from '../../inspections.models';

@Component({
  selector: 'il-inspection-run-category',
  templateUrl: './inspection-run-category.component.html',
  styleUrls: ['./inspection-run-category.component.scss']
})

export class InspectionRunCategoryComponent implements OnInit {
  public displayedColumns: string[] = ['term_name', 'term_description', 'verification', 'remarks'];
  public dataSource: any[];
  public verifOptions: ISimpleItem[] = [
    { label: 'Ok', value: '1' },
    { label: 'Failed', value: '2' },
    { label: 'Comment', value: '3' }
  ];

  @Input() public item: IInspectionRun;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = this.item?.saved_checklist?.checklist_items?.map(i => {
      return i.contract_term
    }) || null
  }

  public handleSelOption(option: ISimpleItem): void {
    if (option.label !== 'Ok') {
      const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {});
      dialogRef.afterClosed().subscribe(result => { });
    }
  }

  public showComment(): void {
    const dialogRef = this.dialog.open(InspectionRunCommentDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe();
  }
}

