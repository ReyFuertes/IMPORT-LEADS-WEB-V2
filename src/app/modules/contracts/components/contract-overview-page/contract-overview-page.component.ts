import { ContractModuleState } from './../../store/reducers/index';
import { ContractsState } from './../../store/reducers/contract.reducer';
import { getAllContractsSelector } from './../../store/selectors/contracts.selector';
import { clearCachedImagesAction, loadContractsAction } from './../../store/actions/contracts.action';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { tap, delay, take, debounceTime, takeUntil } from 'rxjs/operators'
import { AppState, reducers } from './../../../../store/app.reducer';
import { IContract } from './../../contract.model';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contract-add-dialog/contract-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { TranslateService } from '@ngx-translate/core';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-contract-overview-page',
  templateUrl: './contract-overview-page.component.html',
  styleUrls: ['./contract-overview-page.component.scss']
})

export class ContractOverviewPageComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public svgPath: string = environment.svgPath;
  public contracts: IContract[] = [];
  public sortedBy: any;

  @Input() public sortOptions = [{
    label: 'Sort by Start Date',
    value: 'contract.start_date'
  }, {
    label: 'Sort by End Date',
    value: 'contract.delivery_date'
  }, {
    label: 'Sort by Name',
    value: 'contract_name'
  }, {
    label: 'Sort by Venue',
    value: 'venue.name'
  }];

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contracts, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(private cdRef: ChangeDetectorRef, private _store: Store<AppState>, public translateService: TranslateService, public store: Store<ContractModuleState>, public dialog: MatDialog) {
    super();

    this.store.pipe(select(getAllContractsSelector),
      takeUntil(this.$unsubscribe),
      tap(res => {
        this.contracts = res
      })).subscribe();
  }

  ngOnInit() {
    this._store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public ngAfterViewInit(): void {
    this.setSortingToLocal();
  }

  private setSortingToLocal(): void {
    const hasSort = localStorage.getItem('agrmntSortBy');
    if (hasSort) {
      const str = JSON.parse(hasSort)?.split('=');
      const strSortedBy = str[1]?.replace(/[\[\]']+/g, '')?.split(',')[0]?.toUpperCase();

      this.sortedBy = 'Sorted by: ' + strSortedBy?.replace('.', ' ')?.replace('_', ' ');
      this.cdRef.detectChanges();
    }
  }

  public handleSortChanges(event: any): void {
    let orderBy: string;

    const hasSort = localStorage.getItem('agrmntSortBy');
    if (hasSort) {
      const str = JSON.parse(hasSort)?.split('=');
      orderBy = str[1]?.replace(/[\[\]']+/g, '')?.split(',')[1];
    } else {
      orderBy = 'ASC';
    }

    if (orderBy === 'ASC') orderBy = 'DESC'
    else orderBy = 'ASC';
 
    localStorage.setItem('agrmntSortBy', JSON.stringify(`?orderby=[${event?.value},${orderBy}]`));
    this.store.dispatch(loadContractsAction({ param: `?orderby=[${event?.value},${orderBy}]` }));
    this.setSortingToLocal();
  }

  public get hasRecords(): boolean {
    return this.contracts && Object.keys(this.contracts).length > 0;
  }
  public dragStarted(event: any) {
    this.dragStart = event;
  }
  public addContractAction(): void {
    this.store.dispatch(clearCachedImagesAction());

    const dialogRef = this.dialog.open(ContractAddDialogComponent, {
      data: { state: AddEditState.Add }
    });
    dialogRef.afterClosed().subscribe((res) => { });
  }
}
