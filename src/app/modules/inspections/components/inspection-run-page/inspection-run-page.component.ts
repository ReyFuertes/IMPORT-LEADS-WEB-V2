import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getInspectionRunSelector, getInspectionRunStatusSelector, getPrevExistErrorSelector, getUpdatedInspectionRunSelector } from '../../store/selectors/inspection.selector';
import { runNextInspectionAction, runPrevInspectionAction, changeInspectionRuntimeStatusAction, deleteAndNavigateToAction, copyInspectionAction, navigateToInspectionAction, setPauseInspectionStatusAction, loadInspectionRunAction, inspectChecklistRunProductAction, clearRunInspectionAction, clearExistErrorAction } from '../../store/actions/inspection.action';
import { IInspectionRun, RunStatusType } from '../../inspections.models';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import * as _ from 'lodash';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { RunExistErrorDialogComponent } from 'src/app/modules/dialogs/components/run-exist-error/run-exist-error.component';
import { INSPECTIONSROUTE, INSPECTIONSRUNREPORTROUTE } from 'src/app/shared/constants/routes';
import { PauseOrRunDialogComponent } from 'src/app/modules/dialogs/components/pause-run/pause-run.component';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
@Component({
  selector: 'il-inspection-run-page',
  templateUrl: './inspection-run-page.component.html',
  styleUrls: ['./inspection-run-page.component.scss']
})

export class InspectionRunPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public formNavigateTo: FormGroup;
  public inspectionRun: IInspectionRun;
  public products: ISimpleItem[] = [];
  public inspectionRunStatus: string;
  public runInspectionCount: number;
  public savedChecklistId: string
  public permitToNavigate: boolean = false;
  public isStopTriggered: boolean = false;
  public id: string;
  public selProduct: ISimpleItem;
  public hideCategoryTerms: boolean = false;
  public redirectUrl: string = '';

  constructor(public translateService: TranslateService, private route: ActivatedRoute, private dialog: MatDialog, private store: Store<AppState>, private cdRef: ChangeDetectorRef, private router: Router, private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      copyCount: [null],
      items: [null],
      position: [null]
    });

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(loadInspectionRunAction({ id: this.id }));
      this.store.dispatch(clearRunInspectionAction())
    }

    this.store.pipe(select(getInspectionRunStatusSelector),
      takeUntil(this.$unsubscribe),
      tap((res: any) => {
        this.inspectionRunStatus = res;
        if (Number(this.inspectionRunStatus) === Number(RunStatusType.pause)) {
          this.store.dispatch(setPauseInspectionStatusAction({ status: true }));
        } else this.store.dispatch(setPauseInspectionStatusAction({ status: null }));

      })).subscribe();


    this.router.events
      .pipe(filter(e => e instanceof RoutesRecognized))
      .subscribe((e: RoutesRecognized) => this.redirectUrl = e.url);
  }

  ngOnInit() {
    this.store.pipe(select(getInspectionRunSelector))
      .pipe(takeUntil(this.$unsubscribe)).subscribe((res: any) => {
        if (res) {
          const { saved_checklist, count, contract_product, saved_checklist_items, terms } = res;

          if (res?.isLastRow === true) {
            alert('Your in the last row of the record.');
          }

          this.runInspectionCount = count;
          this.savedChecklistId = saved_checklist?.id;
          this.inspectionRun = res;

          if (res?.run_status) {
            this.permitToNavigate = Number(res?.run_status) === Number(RunStatusType.pause) && !this.isStopTriggered;
          }

          this.products = saved_checklist_items?.map(sci => {
            return {
              label: sci.product?.product_name,
              value: sci?.product?.id,
              _id: sci?.contract_product?.id
            }
          });

          /* add default value */
          if (this.products?.length > 0) {
            this.products?.unshift({ label: '', value: null });
            this.products = _.uniqBy(this.products, 'value');
          }

          this.selProduct = Object.assign({}, this.products?.find(cp => cp._id === contract_product?.id));

          if (!this.selProduct?.value) {
            /* if it doesnt find anything then use the localstorage  */
            const insChecklistSelectedProduct = localStorage.getItem('ic_sel_prod');

            this.selProduct = JSON.parse(insChecklistSelectedProduct);
          }
        }
      });

    /* get the updated run inspection if the runInspection variable is not set */
    this.store.pipe(select(getUpdatedInspectionRunSelector))
      .subscribe(res => { })

    this.store.pipe(select(getPrevExistErrorSelector)).subscribe(res => {
      if (res) {
        const dialogRef = this.dialog.open(RunExistErrorDialogComponent, {
          width: '410px',
        });
        dialogRef.afterClosed().subscribe(res => {
          this.store.dispatch(clearExistErrorAction());

          if (res) this.router.navigateByUrl(INSPECTIONSROUTE);
        })
      }
    })

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }

  public onSelectProductChange(event: string, isViewing: boolean = false): void {
    if (!event) {
      this.selProduct = null;
      return;
    };

    if (isViewing) {
      alert('You are in viewing mode');
      return;
    }
    let newSelection: any;
    let changed: boolean = false;

    if (this.selProduct?.value === event || this.selProduct === null) {
      this.selProduct = Object.assign({},
        this.products?.find(cp => cp?.value === event)
      );
      changed = false;
    } else if (this.selProduct?.value !== event) {
      newSelection = this.products?.find(cp => cp?.value === event);
      changed = true;
    }

    const selSavedChecklistItem = this.inspectionRun?.saved_checklist_items?.find(
      i => i?.contract_product?.id === this.selProduct?._id
        && i?.product?.id === this.selProduct?.value);

    if (Object.keys(this.selProduct)?.length > 0) {
      const payload = {
        payload: {
          id: this.selProduct?._id || null, //contract product id
          product_id: this.selProduct?.value,
          inspection_checklist_run: { id: this.route.snapshot.paramMap.get('id') },
          saved_checklist: { id: this.inspectionRun?.saved_checklist?.id },
          contract_category_id: selSavedChecklistItem?.contract_category?.id,
          contract_term_id: selSavedChecklistItem?.contract_term?.id,
          newSelection,
          changed
        }
      }
      this.store.dispatch(inspectChecklistRunProductAction(payload));
    }
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public navigateTo(): void {
    this.permitToNavigate = true;

    const position = this.form.get('position').value;
    if (position) {
      this.store.dispatch(navigateToInspectionAction({ saved_checklist_id: this.savedChecklistId, position }));
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

  public onStop(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 4 }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(result => {
        if (result) {
          this.triggerStop();
          this.permitToNavigate = true;
          this.isStopTriggered = true; /* fail safe for for line 70 */
        }
      });
  }

  public triggerStop(): void {
    const payload = {
      id: this.inspectionRun?.id,
      saved_checklist: { id: this.inspectionRun?.saved_checklist.id },
      run_status: RunStatusType.stop
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
  }

  public onResume(inspectionRun: IInspectionRun): void {
    this.permitToNavigate = true;

    const payload = {
      id: inspectionRun?.id,
      saved_checklist: inspectionRun?.saved_checklist,
      run_status: null
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
  }

  public onPause(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 3 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.permitToNavigate = true;

        this.triggerPause();
      }
    });
  }

  public triggerPause(): void {
    const payload = {
      id: this.inspectionRun?.id,
      saved_checklist: this.inspectionRun?.saved_checklist,
      run_status: this.inspectionRunStatus === RunStatusType.pause ? null : RunStatusType.pause
    }
    this.store.dispatch(changeInspectionRuntimeStatusAction({ payload }));
  }

  public onPrev(inspectionRun: IInspectionRun): void {
    this.permitToNavigate = true;

    this.store.dispatch(runPrevInspectionAction({
      payload: {
        id: inspectionRun.id,
        saved_checklist: { id: inspectionRun?.saved_checklist?.id },
        inspection: this.inspectionRun?.inspection,
        contract_product: { id: this.selProduct?._id },
      }
    }));
  }

  public onNext(inspectionRun: IInspectionRun): void {
    this.permitToNavigate = true;

    if (!this.selProduct?.value) {
      const dialogNoProductRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        height: '175px',
        data: { action: 8, isCloseOnlyOption: true }
      });
      dialogNoProductRef.afterClosed().subscribe(result => { });
      return;
    }

    if (this.form.get('copyCount').value) { /* create number of copies of the current inspection run */
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '410px',
        data: { action: 6 }
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.onCopy(inspectionRun);
          }
        });
    } else {
      /* create only 1 copy when navigating next */
      this.store.dispatch(runNextInspectionAction({
        payload: {
          id: inspectionRun.id,
          contract_product: { id: this.selProduct?._id },
          saved_checklist: { id: inspectionRun?.saved_checklist?.id },
          inspection: this.inspectionRun?.inspection,
          product: { id: this.selProduct?.value }
        }
      }));
    }
  }

  public onCopy(inspectionRun: any): void {
    const payload = {
      id: inspectionRun.id,
      copy_count: Number(this.form.get('copyCount').value),
      contract_product: { id: this.selProduct?._id },
      saved_checklist: { id: inspectionRun?.saved_checklist?.id },
      inspection: this.inspectionRun?.inspection,
      product: { id: this.selProduct?.value },
      checklist_product: { id: inspectionRun?.checklist_product?.id }
    };

    this.store.dispatch(copyInspectionAction(payload));

    this.form.get('copyCount').patchValue(null, { emitEvent: false });
    this.form.reset();
  }

  private get isRunningInspection(): boolean {
    return this.redirectUrl.includes('run')
  }

  public $pauseOrRun(): Observable<boolean> {
    if (!this.permitToNavigate && !this.isRunningInspection) {
      const dialogRef = this.dialog.open(PauseOrRunDialogComponent, {
        width: '410px',
        data: { ins: this.inspectionRun, hasRedirect: true, redirectUrl: this.redirectUrl }
      });

      const ret = dialogRef.afterClosed();
      ret.subscribe((canNavigate: boolean) => {
        if (canNavigate) {
          this.permitToNavigate = true;
        }
      })
      return ret;
    } else { }
    return of(true);
  }

  public onBack(): void {
    this.permitToNavigate = true;
    this.router.navigateByUrl(INSPECTIONSROUTE);
  }

  public get checklistProductHasTerms(): boolean {
    return this.inspectionRun?.terms?.length > 0 || !this.selProduct;
  }

  public get hasSelectedProduct(): boolean {
    return this.selProduct?.value ? true : false;
  }

  public get isFirstRecord(): boolean {
    return Number(this.runInspectionCount) === 1 ? true : false;
  }

  public get isBtnActionDisabled(): boolean {
    return Number(this.inspectionRunStatus) === Number(RunStatusType.pause);
  }

  public get isNext(): boolean {
    return Number(this.inspectionRunStatus) === Number(RunStatusType.pause) || !this.selProduct?.value;
  }
}
