import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getInspectionRunFilterByProductIdSelector, getInspectionRunSelector, getInspectionRunStatusSelector } from '../../store/selectors/inspection.selector';
import { runNextInspectionAction, runPrevInspectionAction, changeInspectionStatusAction, deleteAndNavigateToAction, copyInspectionAction, navigateToInspectionAction } from '../../store/actions/inspection.action';
import { IInspectionRun, RunStatusType } from '../../inspections.models';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import * as _ from 'lodash';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
@Component({
  selector: 'il-inspection-run-page',
  templateUrl: './inspection-run-page.component.html',
  styleUrls: ['./inspection-run-page.component.scss']
})

export class InspectionRunPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public formNavigateTo: FormGroup;
  public $inspectionRun: Observable<IInspectionRun>;
  public products: ISimpleItem[] = [];
  public runInspectionStatus: string;
  public runInspectionCount: number;
  public saved_checklist_id: string

  constructor(private dialog: MatDialog, private store: Store<AppState>, private cdRef: ChangeDetectorRef, private router: Router, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      copyCount: [null],
      items: [null],
      position: [null]
    });

    this.store.pipe(select(getInspectionRunStatusSelector),
      tap((res: any) => {
        this.runInspectionStatus = res;
      })).subscribe();
  }

  ngOnInit() {
    this.$inspectionRun = this.store.pipe(select(getInspectionRunSelector));
    this.$inspectionRun.pipe(takeUntil(this.$unsubscribe)).subscribe((res: any) => {
      this.runInspectionCount = res?.count;
      this.saved_checklist_id = res?.checklist.id;

      this.products = res?.checklist?.items.map(c => {
        return {
          label: c.contract_product.product.product_name,
          value: c.contract_product.id
        }
      })
      /* insert default value */
      if (this.products) {
        this.products?.unshift({ label: '', value: null });
        this.products = _.uniqBy(this.products, 'value');
      }
    })
  }

  public get isFirstRecord(): boolean {
    return Number(this.runInspectionCount) === 1 ? true : false;
  }

  public get isPaused(): boolean {
    return Number(this.runInspectionStatus) === Number(RunStatusType.pause);
  }

  public navigateTo(): void {
    const position = this.form.get('position').value;
    if (position) {
      this.store.dispatch(navigateToInspectionAction({ saved_checklist_id: this.saved_checklist_id, position }));
      this.form.get('position').patchValue(null);
    }
  }

  public onDeleteNavigateTo(ins: IInspectionRun): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 5 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          this.store.dispatch(deleteAndNavigateToAction({ id: ins?.id }));
        }
      });
  }

  public onStop(ins: IInspectionRun): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 4 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          const payload = {
            id: ins?.id,
            saved_checklist: ins?.checklist,
            run_status: RunStatusType.stop
          }
          this.store.dispatch(changeInspectionStatusAction({ payload }));
        }
      });
  }

  public onResume(ins: IInspectionRun): void {
    const payload = {
      id: ins?.id,
      saved_checklist: ins?.checklist,
      run_status: null
    }
    this.store.dispatch(changeInspectionStatusAction({ payload }));
  }

  public onPause(ins: IInspectionRun): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 3 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          const payload = {
            id: ins?.id,
            saved_checklist: ins?.checklist,
            run_status: this.runInspectionStatus === RunStatusType.pause ? null : RunStatusType.pause
          }
          this.store.dispatch(changeInspectionStatusAction({ payload }));
        }
      });
  }

  public handleValueEmitter(event: any): void {
    /* filter checklist by product */
    if (event)
      this.$inspectionRun = this.store.pipe(select(getInspectionRunFilterByProductIdSelector(event)));
    else
      this.$inspectionRun = this.store.pipe(select(getInspectionRunSelector));
  }

  public onPrev(ins: IInspectionRun): void {
    this.store.dispatch(runPrevInspectionAction({ payload: { id: ins.id, saved_checklist_id: ins?.checklist?.id } }));
  }

  public onNext(ins: IInspectionRun): void {
    if (this.form.get('copyCount').value) { /* create number of copies of the current inspection run */
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: { action: 6 }
      });
      dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
        .subscribe(result => {
          if (result) {
            this.store.dispatch(copyInspectionAction({ id: ins.id, copyCount: Number(this.form.get('copyCount').value) }));
            this.form.get('copyCount').patchValue(null, { emitEvent: false });
          }
        });
    } else {
      /* create only 1 copy when navigating next */
      this.store.dispatch(runNextInspectionAction({ payload: { id: ins.id, saved_checklist_id: ins?.checklist?.id } }));
    }
  }

  public onBack(): void {
    this.router.navigateByUrl('/dashboard/inspections');
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
