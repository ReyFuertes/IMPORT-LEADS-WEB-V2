import { Observable } from 'rxjs';
import { getInspectionChecklistSelector } from './../../store/inspection.selector';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { InspectionPanelModel, IInspectionChecklist } from './../../inspections.models';
import { Component, OnInit } from '@angular/core';
import { getAllSavedChecklistSelector } from 'src/app/modules/contracts/store/selectors/saved-checklist.selector';
import { ISavedChecklistItem } from 'src/app/modules/contracts/contract.model';

@Component({
  selector: 'il-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.scss']
})

export class InspectionPageComponent implements OnInit {
  public $savedChecklists: Observable<ISavedChecklistItem[]>;

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
      label: 'Total Amount',
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
  constructor(private store: Store<AppState>) {
    this.$savedChecklists = this.store.pipe(select(getAllSavedChecklistSelector));
    this.$savedChecklists.subscribe(res => console.log(res));
  }

  ngOnInit() { }
}
