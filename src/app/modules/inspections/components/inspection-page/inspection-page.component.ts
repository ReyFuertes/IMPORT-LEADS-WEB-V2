import { Observable } from 'rxjs';
import { getActiveInspectionsSelector } from './../../store/selectors/inspection.selector';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { IActiveInspection } from './../../inspections.models';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  public sortOptions = [{
    label: 'Sort by Name',
    value: 'contract_name'
  }, {
    label: 'Sort by Date',
    value: 'created_at'
  }];
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
    this.store.dispatch(loadSavedChecklistAction({}));
  }

  ngOnInit() {
    this.store.pipe(select(getActiveInspectionsSelector),
      takeUntil(this.$unsubscribe)).subscribe((res) => {
        if (res) {
          this.activeInspections = res;
        }
      });
  }

  public handleSortChanges(event: any): void {
    let orderBy: string;
    const localAgreementSortBy = JSON.parse(localStorage.getItem('agrmntSortBy')) || null;
    orderBy = localAgreementSortBy || 'asc';

    if (localAgreementSortBy === 'asc') orderBy = 'desc'
    else orderBy = 'asc';

    localStorage.setItem('agrmntSortBy', JSON.stringify(orderBy));
    this.store.dispatch(loadSavedChecklistAction({ param: `?orderby=[${event?.value},${orderBy}]` }))
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
