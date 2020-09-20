import { AddEditState, ISimpleItem } from '../../../../shared/generics/generic.model';
import { InspectionCommentDialogComponent } from '../../../dialogs/components/inspection-comment/inspection-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { IInsChecklistTerm, IInspectionChecklistImage, IInspectionRun, InspectionVeriType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { select, Store } from '@ngrx/store';
import { IChecklist, IContractTerm } from 'src/app/modules/contracts/contract.model';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil, tap } from 'rxjs/operators';
import { deleteInsChecklistAction, getInsChecklistAction, saveInsChecklisImageAction, saveInsChecklistAction, saveInsChecklistImageFilesAction, updateInsChecklistAction } from '../../store/actions/inspection-checklist.action';
import { ModalStateType } from 'src/app/models/generic.model';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { InspectionChecklistService } from '../../inspections.service';
import { getInsChecklistImagesSelector } from '../../store/selectors/inspection-checklist.selector';

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
  public images: IInspectionChecklistImage[];

  @Input() public row: IInsChecklistTerm;
  @Input() public checklist_run_id: string;
  @Input() public categoryId: string;
  @Input() public savedChecklist: IChecklist;
  @Input() public runId: string;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    super();
    this.store.pipe(select(getInsChecklistImagesSelector),
      takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res) {
          this.images = res.map(r => {
            return ({
              ...r,
              inspection_checklist_run: { id: this.checklist_run_id },
              contract_term: { id: this.row.id }
            })
          })
        }
      })).subscribe();
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
                inspection_checklist_run: { id: this.checklist_run_id },
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

  public showComment = (id: string): void => {
    const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {
      data: { state: ModalStateType.edit, id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          /* update comment */
          this.store.dispatch(updateInsChecklistAction({
            payload: {
              id: result?.id,
              comment: result?.comments
            }
          }));

          /* save images */
          this.store.dispatch(saveInsChecklisImageAction({
            payload: this.images
          }));

          /* upload image */
          let formData = new FormData();
          this.cnsFileObj(formData);

          this.store.dispatch(saveInsChecklistImageFilesAction({ files: formData }));
        }
      })
  }

  /* NOTE: move this to a utility or abstraction class */
  private cnsFileObj(files: FormData): any {
    return Object.values(this.images) && this.images.map(ci => {
      if (ci.file)
        files.append('files', ci.file, ci.filename);
      return { id: ci.id, filename: ci.filename, size: ci.size, mimetype: ci.mimetype }
    }) || null;
  }
}