import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getInspectionRunFilterByProductIdSelector, getInspectionRunSelector, getInspectionRunStatusSelector } from '../../store/selectors/inspection.selector';
import { runNextInspectionAction, runPrevInspectionAction, changeInspectionStatusAction } from '../../store/actions/inspection.action';
import { IInspectionRun, RunStatusType } from '../../inspections.models';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import * as _ from 'lodash';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { takeUntil, tap } from 'rxjs/operators';
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

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, private router: Router, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      items: ['']
    });
    this.formNavigateTo = this.fb.group({
      position: [null]
    });

    this.store.pipe(select(getInspectionRunStatusSelector),
      tap(res => {
        this.runInspectionStatus = res;
      })).subscribe();
  }

  ngOnInit() {
    this.$inspectionRun = this.store.pipe(select(getInspectionRunSelector));
    this.$inspectionRun.pipe(takeUntil(this.$unsubscribe)).subscribe(res => {
      this.products = res?.checklist.items.map(c => {
        return {
          label: c.contract_product.product.product_name,
          value: c.contract_product.id
        }
      })
      this.products = _.uniqBy(this.products, 'value');
    })
  }

  public get isPaused(): boolean {
    return this.runInspectionStatus !== RunStatusType.pause;
  }

  public onStop(ins: IInspectionRun): void {
    const payload = {
      id: ins?.id,
      saved_checklist: ins?.checklist,
      run_status: RunStatusType.stop
    }
    this.store.dispatch(changeInspectionStatusAction({ payload }));
  }

  public onPause(ins: IInspectionRun): void {
    const payload = {
      id: ins?.id,
      saved_checklist: ins?.checklist,
      run_status: this.runInspectionStatus === RunStatusType.pause ? null : RunStatusType.pause
    }
    this.store.dispatch(changeInspectionStatusAction({ payload }));
  }

  public handleValueEmitter(event: any): void {
    /* filter checklist by product */
    this.$inspectionRun = this.store.pipe(select(getInspectionRunFilterByProductIdSelector(event)));
  }

  public onPrev(ins: IInspectionRun): void {
    this.store.dispatch(runPrevInspectionAction({ payload: { id: ins.id, saved_checklist_id: ins?.checklist?.id } }));
  }

  public onNext(ins: IInspectionRun): void {
    this.store.dispatch(runNextInspectionAction({ payload: { id: ins.id, saved_checklist_id: ins?.checklist?.id } }));
  }

  public onBack(): void {
    this.router.navigateByUrl('/dashboard/inspections');
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
