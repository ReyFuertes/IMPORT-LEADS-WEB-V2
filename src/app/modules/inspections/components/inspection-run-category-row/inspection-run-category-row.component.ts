import { ISimpleItem } from '../../../../shared/generics/generic.model';
import { InspectionCommentDialogComponent } from '../../../dialogs/components/inspection-comment/inspection-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { InsChecklistTerm, IInspectionChecklistImage, IInspectionRunItem, InspectionVerificationType, RunStatusType } from '../../inspections.models';
import * as _ from 'lodash';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { select, Store } from '@ngrx/store';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { take, takeUntil, tap } from 'rxjs/operators';
import { clearInsChecklistImageAction, deleteInsChecklistAction, saveInsChecklisImageAction, saveInsChecklistCommentAction, saveInsChecklistImageFilesAction, updateInsChecklistCommentAction } from '../../store/actions/inspection-checklist.action';
import { ModalStateType } from 'src/app/models/generic.model';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { getInsChecklistImagesSelector } from '../../store/selectors/inspection-checklist.selector';
import { getInspectionRunStatusSelector } from '../../store/selectors/inspection.selector';
import { logToConsoleError } from 'src/app/shared/util/logger';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-inspection-run-category-row',
  templateUrl: './inspection-run-category-row.component.html',
  styleUrls: ['./inspection-run-category-row.component.scss']
})

export class InspectionRunCategoryRowComponent extends GenericDestroyPageComponent implements OnInit, OnChanges {
  @Input() public source: any;
  @Input() public term: any;
  @Input() public isViewing: boolean;

  public verifOptions: ISimpleItem[] = [
    { label: 'Ok', value: 'ok' },
    { label: 'Failed', value: 'failed' },
    { label: 'Comment', value: 'comment' }
  ];
  public inspectionVeriType = InspectionVerificationType;
  public images: IInspectionChecklistImage[];
  public runInspectionStatus: string;
  public rowUpdate: InsChecklistTerm;

  constructor(public translateService: TranslateService, private store: Store<AppState>, private cdRef: ChangeDetectorRef, public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.rowUpdate = Object.assign({}, this.term);

    this.store.pipe(select(getInspectionRunStatusSelector),
      tap(res => {
        this.runInspectionStatus = res;
      })).subscribe();

    this.store.pipe(select(getInsChecklistImagesSelector),
      takeUntil(this.$unsubscribe)).subscribe((res) => {
        if (res?.length > 0) {
          this.images = res?.map(r => {
            return ({
              ...r,
              inspection_checklist_run: { id: this.term?.inspection_checklist_run?.id },
              contract_term: { id: this.term?.id }
            })
          });
        }
      });

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }

  public handleSelOption(option: ISimpleItem): void {
    /* we need to trigger changes to an object so we can trigger an update */
    this.rowUpdate = Object.assign({}, this.rowUpdate, {
      comment: Object.assign({}, this.rowUpdate.comment, {
        verification: option?.value
      })
    });

    /* clear all the state images first */
    this.store.dispatch(clearInsChecklistImageAction());

    if (option.value === InspectionVerificationType.failed || option.value === InspectionVerificationType.comment) {
      const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {
        data: { isFailed: option.value === InspectionVerificationType.failed }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          /* update the ui selection */
          this.rowUpdate = new InsChecklistTerm();
          this.rowUpdate = Object.assign({}, this.term, {
            comment: { verification: option?.value }
          });

          const source = this.source?.terms?.find(s => s?.id === this.term?.id);
          const payload = {
            payload: {
              id: this.term?.comment?.id,
              comment: result.comments,
              verification: option.value,
              inspection_checklist_run: { id: this.term?.inspection_checklist_run?.id },
              contract_term: { id: source?.contract_term?.id },
              contract_category: { id: source?.contract_category?.id },
              saved_checklist: { id: source?.saved_checklist?.id },
              contract_product: { id: source?.contract_product?.id }
            }
          }
          this.store.dispatch(saveInsChecklistCommentAction(payload));
          this.saveAndUpdateImage();

        } else {
          /* revert back to the previous ui setting */
          this.rowUpdate = Object.assign({}, this.term);
        }
        this.cdRef.detectChanges();
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmationComponent, { width: '410px', data: { action: 2 } });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.rowUpdate = new InsChecklistTerm();
          this.rowUpdate = Object.assign({}, this.term, {
            comment: {
              verification: option?.value
            }
          });
          const source = this.source?.terms?.find(s => s?.id === this.term?.id);

          this.store.dispatch(updateInsChecklistCommentAction({
            payload: {
              id: this.term?.comment?.id,
              verification: InspectionVerificationType.ok,
              comment: null,
              inspection_checklist_run: { id: this.term?.inspection_checklist_run?.id },
              contract_product: { id: source?.contract_product?.id }
            }
          }));
        } else {
          this.rowUpdate = this.term;
        }
      });
    }
  }

  public showComment(id: string): void {
    const dialogRef = this.dialog.open(InspectionCommentDialogComponent, {
      data: { state: ModalStateType.edit, id, isFailed: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const source = this.source?.terms?.find(s => s?.id === this.term?.id);

        this.store.dispatch(updateInsChecklistCommentAction({
          payload: {
            id: result?.id,
            comment: result.comments,
            inspection_checklist_run: { id: this.term?.inspection_checklist_run?.id },
            contract_product: { id: source?.contract_product?.id }
          }
        }));

        this.saveAndUpdateImage();
      }
    })
  }

  private saveAndUpdateImage(): void {
    /* save images */
    this.store.pipe(select(getInsChecklistImagesSelector),
      takeUntil(this.$unsubscribe),
      take(1)).subscribe((res) => {
        if (res?.length > 0) {

          const source = this.source?.terms?.find(s => s?.id === this.term?.id);

          this.images = res?.map(r => {
            return ({
              file: r?.file,
              filename: r?.filename,
              mimetype: r?.mimetype,
              size: r?.size,
              inspection_checklist_run: { id: this.term?.inspection_checklist_run?.id },
              contract_term: { id: this.term?.contract_term?.id },
              saved_checklist: { id: source?.saved_checklist?.id },
              contract_product: { id: source?.contract_product?.id }
            })
          });

          this.store.dispatch(saveInsChecklisImageAction({ payload: this.images }));

          /* upload image */
          let formData = new FormData();
          if (source?.saved_checklist?.id) {
            formData.set('saved_checklist_id', source?.saved_checklist?.id);
            this.cnsFileObj(formData);
            this.store.dispatch(saveInsChecklistImageFilesAction({ files: formData }));
          } else {
            logToConsoleError('saveAndUpdateImage: SOURCE CHECKLIST ID IS NULL! ');
          }
        }
      });
  }

  /* NOTE: move this to a utility or abstraction class */
  private cnsFileObj(files: FormData): any {
    return Object.values(this.images) && this.images?.map(ci => {
      if (ci.file)
        files.append('files', ci.file, ci.filename);
      return { id: ci.id, filename: ci.filename, size: ci.size, mimetype: ci.mimetype }
    }) || null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.source?.currentValue) {
      this.source = changes?.source?.currentValue;
    }
    if (changes?.row?.currentValue) {
      this.term = changes?.row?.currentValue;
    }
  }

  public get isPaused(): boolean {
    return this.runInspectionStatus == RunStatusType.pause;
  }

  public get getSelection(): any {
    return this.term?.comment?.verification || String(this.inspectionVeriType.ok);
  }

  public isVerified(verification: InspectionVerificationType): boolean {
    return verification !== this.inspectionVeriType.ok
  }
}