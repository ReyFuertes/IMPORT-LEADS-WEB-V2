import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IInspectionRun } from '../../inspections.models';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getInspectionRunSelector } from '../../store/inspection.selector';

@Component({
  selector: 'il-inspection-run-page',
  templateUrl: './inspection-run-page.component.html',
  styleUrls: ['./inspection-run-page.component.scss']
})

export class InspectionRunPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public formNavigateTo: FormGroup;
  public $inspectionRun: Observable<IInspectionRun[]>;

  constructor(private store: Store<AppState>, private cdRef: ChangeDetectorRef, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      items: ['']
    });
    this.formNavigateTo = this.fb.group({
      position: [null]
    });
  }

  ngOnInit() {
    this.$inspectionRun = this.store.pipe(select(getInspectionRunSelector));
    this.$inspectionRun.subscribe(res => console.log('inspectionRun', res))
  }

  public onBack(): void {
    this.router.navigateByUrl('/dashboard/inspections');
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
