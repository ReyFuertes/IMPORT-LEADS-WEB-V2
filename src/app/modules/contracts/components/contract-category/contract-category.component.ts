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
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';


@Component({
  selector: 'il-contract-category',
  templateUrl: './contract-category.component.html',
  styleUrls: ['./contract-category.component.scss'],
  providers: [ConfirmationService]
})

export class ContractCategoryComponent extends GenericRowComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public _showTabActions: boolean = false;
  public panels: Array<{ id: number, title: string, description: string }> = [];
  public tabTitle: string;
  @Input()
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  @Input()
  public specTitle: string = 'Specification title';
  @Input()
  public contractCategory: IContractCategory;
  @Input()
  public isRightNavOpen: boolean = false;
  public showToggle: boolean = false;
  @Output()
  public removeProductSpecEmitter = new EventEmitter<number>();

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    super();
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.contract_category && changes.contract_category.currentValue) {
      this.contractCategory = changes.contract_category.currentValue;
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
        this.store.dispatch(loadContractCategory({ id: this.contractCategory.contract.id }))
      }
    });
  }
}
