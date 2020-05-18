import { loadContractCategory } from '../../store/actions/contract-category.action';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ICategory } from '../../contract.model';
import { ConfirmationComponent } from '../../../dialogs/components/confirmation/confirmation.component';
import { ContractCategoryTitleDialogComponent } from '../../../dialogs/components/contract-category-title/contract-category-title-dialog.component';
import { ContractCategoryDialogComponent } from '../../../dialogs/components/contract-category/contract-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { IContractCategory } from '../../contract.model';
import { updateCategory } from '../../store/actions/category.action';

@Component({
  selector: 'il-contract-category',
  templateUrl: './contract-category.component.html',
  styleUrls: ['./contract-category.component.scss'],
  providers: [ConfirmationService]
})

export class ContractCategoryComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public _showTabActions: boolean = false;
  public panels: Array<{ id: number, title: string, description: string }> = [
    {
      id: 1,
      title: '2G1W Dimmer Picture',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 2,
      title: 'Rated Voltage',
      description: '<500W'
    },
    {
      id: 3,
      title: 'Ive seen other answers suggesting animating',
      description: 'Start editing to see some magic happen :).'
    },
    {
      id: 4,
      title: 'In case anyone is reading this',
      description: 'transition '
    }
  ];
  public tabTitle: string;
  @Input()
  public specTitle: string = 'Specification title';
  @Input()
  public contract_category: IContractCategory;
  @Input()
  public isRightNavOpen: boolean = false;
  public showToggle: boolean = false;
  @Output()
  public removeProductSpecEmitter = new EventEmitter<number>();

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.contract_category.currentValue) {
      this.contract_category = changes.contract_category.currentValue;
    }
    this.isRightNavOpen = this.isRightNavOpen;
  }

  public addTitle(): void {
    const dialogRef = this.dialog.open(ContractCategoryTitleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.specification['title'] = result;
      }
    });
  }

  public UpdateCategoryName(category: ICategory): void {
    const dialogRef = this.dialog.open(ContractCategoryDialogComponent, {
      data: { category }
    });
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.store.dispatch(updateCategory({ payload }));
        /* just refresh all contract categories, may not be idea but temporary solution */
        this.store.dispatch(loadContractCategory({ id: this.contract_category.contract.id }))
      }
    });
  }
}
