import { IContractTerm, IContractCategoryTerm } from './../../contract.model';
import { loadContractCategoryAction } from '../../store/actions/contract-category.action';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ICategory } from '../../contract.model';
import { ContractCategoryTitleDialogComponent } from '../../../dialogs/components/contract-category-title/contract-category-title-dialog.component';
import { ContractCategoryDialogComponent } from '../../../dialogs/components/contract-category/contract-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { IContractCategory } from '../../contract.model';
import { updateCategoryAction } from '../../store/actions/category.action';
import { GenericRowComponent } from 'src/app/shared/generics/generic-panel';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'il-contract-category',
  templateUrl: './contract-category.component.html',
  styleUrls: ['./contract-category.component.scss'],
  providers: [ConfirmationService]
})

export class ContractCategoryComponent extends GenericRowComponent implements OnInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public panels: Array<{ id: number, title: string, description: string }> = [];
  public tabTitle: string;
  public hoveredIndex: number | null = null;
  public selectedIndex: number | null = null;
  public showToggle: boolean = false;

  @Input() public contractCategory: IContractCategory;
  @Input() public inCheckListing: boolean = false;
  @Output() public removeProductSpecEmitter = new EventEmitter<number>();
  @Output() public categoryTermEmitter = new EventEmitter<IContractCategoryTerm>();

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    super();
  }

  ngOnInit() { }

  public onToggleTerm(event: IContractCategoryTerm): void {
    this.categoryTermEmitter.emit(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.contract_category && changes.contract_category.currentValue) {
      this.contractCategory = changes.contract_category.currentValue;
    }
    this.inCheckListing = changes.inCheckListing.currentValue;
  }

  public addTitle(): void {
    const dialogRef = this.dialog.open(ContractCategoryTitleDialogComponent);
    dialogRef.afterClosed()
    .pipe(takeUntil(this.$unsubscribe)).subscribe(result => {
      if (result) {
        //this.specification['title'] = result;
      }
    });
  }

  public UpdateCategoryName(category: ICategory): void {
    const dialogRef = this.dialog.open(ContractCategoryDialogComponent, {
      data: { category }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.$unsubscribe))
      .subscribe(payload => {
        if (payload) {
          this.store.dispatch(updateCategoryAction({ payload }));
          /* just refresh all contract categories, may not be idea but temporary solution */
          this.store.dispatch(loadContractCategoryAction({ id: this.contractCategory.contract.id }))
        }
      });
  }
}
