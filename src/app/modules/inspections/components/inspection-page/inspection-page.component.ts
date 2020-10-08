import { Observable } from 'rxjs';
import { getActiveInspectionsSelector } from './../../store/selectors/inspection.selector';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { IActiveInspection } from './../../inspections.models';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { getAllSavedChecklistSelector } from 'src/app/modules/contracts/store/selectors/saved-checklist.selector';
import { ISavedChecklistItem } from 'src/app/modules/contracts/contract.model';
import { takeUntil, tap } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { loadSavedChecklistAction } from 'src/app/modules/contracts/store/actions/saved-checklist.action';

@Component({
  selector: 'il-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss']
})

export class InspectionPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public activeCols: ISimpleItem[] = [{
    label: 'Contract Name',
    value: '35'
  }, {
    label: 'Assigned to',
    value: '35'
  }, {
    label: 'Configured Run Date',
    value: '20'
  }, {
    label: 'Run Count',
    value: '10'
  }, {
    label: '',
    value: '5'
  }];
  public finishedCols: ISimpleItem[] = [{
    label: 'Contract Name',
    value: '40'
  }, {
    label: 'Assigned to',
    value: '32'
  }, {
    label: 'Start Date',
    value: '10'
  }, {
    label: 'End Date',
    value: '10'
  }, {
    label: 'Run Date',
    value: '10'
  }, {
    label: 'Total Amount',
    value: '10'
  }];
  public $savedChecklists: Observable<IActiveInspection[]>;
  public activeInspections: IActiveInspection[];

  constructor(private cdRef: ChangeDetectorRef, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.$savedChecklists = this.store.pipe(select(getActiveInspectionsSelector));
    this.$savedChecklists.pipe(takeUntil(this.$unsubscribe),
      tap((res) => {
        if (res) this.activeInspections = res
      })).subscribe();

    this.store.dispatch(loadSavedChecklistAction({}));
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
