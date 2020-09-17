import { AddEditState, ISimpleItem } from '../../../../shared/generics/generic.model';
import { InspectionCommentDialogComponent } from '../../../dialogs/components/inspection-comment/inspection-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { IInsChecklistTerm, IInspectionRun, InspectionVeriType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store } from '@ngrx/store';
import { IChecklist, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil } from 'rxjs/operators';
import { deleteInsChecklistAction, getInsChecklistAction, saveInsChecklistAction } from '../../store/actions/inspection-checklist.action';
import { ModalStateType } from 'src/app/models/generic.model';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { InspectionChecklistService } from '../../inspections.service';

@Component({
  selector: 'il-inspection-run-category-row',
  templateUrl: './inspection-run-category-row.component.html',
  styleUrls: ['./inspection-run-category-row.component.scss']
})

export class InspectionRunCategoryRowComponent extends GenericDestroyPageComponent implements OnInit {
  public verifOptions: ISimpleItem[] = [
    { label: 'Ok', value: 'ok' },
    { label: 'Failed', value: 'failed' },
    { label: 'Comment', value: 'comment' }
  ];
  public inspectionVeriType = InspectionVeriType;
  public term: IContractTerm;

  @Input() public row: IInsChecklistTerm;
  @Input() public inspectId: string;
  @Input() public categoryId: string;
  @Input() public savedChecklist: IChecklist;
  @Input() public runId: string;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    super();
  }

  ngOnInit() { }

  public isVerified(verification: string): boolean {
    return verification !== null && verification !== this.inspectionVeriType?.ok
  }

  public handleSelOption(option: ISimpleItem, item: IInsChecklistTerm): void {
    const prevSelection = Object.assign({}, item);

    if (option.label !== 'Ok') {
      const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {});
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe((result) => {
          if (result) {
            this.row.checklist_item.verification = option.value;

            /* save verification and comments */
            this.store.dispatch(saveInsChecklistAction({
              payload: {
                verification: this.row?.checklist_item?.verification,
                comment: result.comments,
                inspection_run: { id: this.inspectId },
                contract_term: { id: item.id },
                contract_category: { id: this.categoryId },
                saved_checklist: { id: this.savedChecklist?.id }
              }
            }));
          } else {
            this.row = Object.assign({}, this.row, {
              checklist_item: {
                verification: null
              }
            });
            setTimeout(() => {
              this.row = Object.assign({}, this.row, {
                checklist_item: Object.assign({}, item.checklist_item, {
                  verification: prevSelection?.checklist_item?.verification
                })
              });
            });
          }
          this.cdRef.detectChanges();
        });
    } else {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px', data: { action: 2 }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(deleteInsChecklistAction({ id: item?.checklist_item?.id }));
            this.row = Object.assign({}, this.row, {
              checklist_item: Object.assign({}, item.checklist_item, {
                verification: option?.value
              })
            });
          }
        });
    }
  }

  public showComment(id: string): void {
    console.log(this.row)
    debugger
    const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {
      data: { state: ModalStateType.edit, id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(res => {

      })
  }
}