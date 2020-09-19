import { ContractModuleState } from './../../store/reducers/index';
import { ContractsState } from './../../store/reducers/contract.reducer';
import { getAllContractsSelector } from './../../store/selectors/contracts.selector';
import { clearCachedImagesAction } from './../../store/actions/contracts.action';
import { AddEditState } from 'src/app/shared/generics/generic.model';
import { tap, delay, take, debounceTime, takeUntil } from 'rxjs/operators'
import { AppState, reducers } from './../../../../store/app.reducer';
import { IContract } from './../../contract.model';
import { ContractAddDialogComponent } from 'src/app/modules/dialogs/components/contracts-add/contract-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store, select } from '@ngrx/store';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

@Component({
  selector: 'il-contract-overview-page',
  templateUrl: './contract-overview-page.component.html',
  styleUrls: ['./contract-overview-page.component.scss']
})

export class ContractOverviewPageComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public contracts: IContract[] = [];

  public dragStart: boolean = false;
  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.contracts, event.previousIndex, event.currentIndex);
    this.dragStart = false;
  }

  constructor(public store: Store<ContractModuleState>, public dialog: MatDialog) {
    super();

    this.store.pipe(select(getAllContractsSelector),
      takeUntil(this.$unsubscribe),
      tap(res => this.contracts = res))
      .subscribe();
  }

  ngOnInit() { }

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
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe), take(1)).subscribe((res) => { });
  }
}
