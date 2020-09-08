import { Observable } from 'rxjs';
import { getActiveInspectionsSelector } from './../../store/inspection.selector';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { IActiveInspection } from './../../inspections.models';
import { Component, OnInit } from '@angular/core';
import { getAllSavedChecklistSelector } from 'src/app/modules/contracts/store/selectors/saved-checklist.selector';
import { ISavedChecklistItem } from 'src/app/modules/contracts/contract.model';
import { takeUntil, tap } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss']
})

export class InspectionPageComponent extends GenericDestroyPageComponent implements OnInit {
  public ctCols: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Contract Name',
      width: 35
    },
    {
      label: 'Assigned to',
      width: 35
    },
    {
      label: 'Configured Run Date',
      width: 20
    },
    {
      label: 'Run Count',
      width: 10
    },
    {
      label: '',
      width: 5
    }
  ];
  public catCols: Array<{ label: string, width?: string | number }> = [
    {
      label: 'Contract Name',
      width: 40
    },
    {
      label: 'Assigned to',
      width: 32
    },
    {
      label: 'Start Date',
      width: 10
    },
    {
      label: 'End Date',
      width: 10
    },
    {
      label: 'Run Date',
      width: 10
    },
    {
      label: 'Total Amount',
      width: 10
    }
  ];
  public $savedChecklists: Observable<IActiveInspection[]>;
  public activeInspections: IActiveInspection[];

  constructor(private store: Store<AppState>) {
    super();

    this.$savedChecklists = this.store.pipe(select(getActiveInspectionsSelector));
    this.$savedChecklists.pipe(takeUntil(this.$unsubscribe),
      tap((res) => this.activeInspections = res))
      .subscribe();
  }

  ngOnInit() { }
}
