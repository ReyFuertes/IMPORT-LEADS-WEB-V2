import { Observable } from 'rxjs';
import { getActiveInspectionsSelector } from './../../store/selectors/inspection.selector';
import { AppState } from './../../../contracts/store/reducers/index';
import { Store, select } from '@ngrx/store';
import { IActiveInspection } from './../../inspections.models';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { loadSavedChecklistAction } from 'src/app/modules/contracts/store/actions/saved-checklist.action';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { loadActiveInspectionAction, loadFinishInspectionAction } from '../../store/actions/inspection.action';

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
    label: 'Assigned To',
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
    value: '35'
  }, {
    label: 'Assigned To',
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
  public $savedChecklists: Observable<IActiveInspection[]>;
  public activeInspections: IActiveInspection[];
  public selectedIndex: number;

  constructor(public translateService: TranslateService, private cdRef: ChangeDetectorRef, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(loadActiveInspectionAction({}));
    this.store.dispatch(loadFinishInspectionAction({}));
    this.store.pipe(select(getActiveInspectionsSelector),
      takeUntil(this.$unsubscribe)).subscribe((res) => {
        if (res) this.activeInspections = res;
      });

    localStorage.removeItem('ic_sel_prod');

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
        }
      });
  }

  public onTabChange(event: any): void {
    this.selectedIndex = event?.index;
  }

  public handleSortChanges(event: any): void {
    let orderBy: string;
    const localAgreementSortBy = JSON.parse(localStorage.getItem('agrmntSortBy')) || null;
    orderBy = localAgreementSortBy || 'asc';

    if (localAgreementSortBy === 'asc') orderBy = 'desc'
    else orderBy = 'asc';

    localStorage.setItem('agrmntSortBy', JSON.stringify(orderBy));
    if (this.selectedIndex === 0) {
      this.store.dispatch(loadActiveInspectionAction({ param: `?orderby=[${event?.value},${orderBy}]` }));
    } else {
      this.store.dispatch(loadFinishInspectionAction({ param: `?orderby=[${event?.value},${orderBy}]` }));
    }
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
