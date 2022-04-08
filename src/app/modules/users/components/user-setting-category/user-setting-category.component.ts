import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { takeUntil } from 'rxjs/operators';
import { ICategory, ICategoryContract, IContract } from 'src/app/modules/contracts/contract.model';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { ContractCategoryListDialogComponent } from 'src/app/modules/dialogs/components/contract-category-list-dialog/contract-category-list-dialog.component';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { deleteUserSettingCategoryAction, loadUserSettingContractByCategoryIdAction } from '../../store/actions/user-setting.action';
import { getContractAsOptionSelector, getUserSettingCategoriesWithContractSelector, getUserSettingContractsByCategoryIdSelector } from '../../store/selectors/user-setting.selector';

@Component({
  selector: 'il-user-setting-category',
  templateUrl: './user-setting-category.component.html',
  styleUrls: ['./user-setting-category.component.scss']
})
export class UserSettingCategoryComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public categoryWithContract: ICategoryContract[];
  public items: MenuItem[];
  public contracts: ISimpleItem[];

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserSettingCategoriesWithContractSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(categoryWithContract => {
        this.categoryWithContract = categoryWithContract;
      });

    this.store.pipe(select(getContractAsOptionSelector))
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(contracts => {
        this.contracts = contracts;
      });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onEdit(): void { }

  public contractToSimpleItem(value: any): ISimpleItem {
    return value?.id;
  }

  public get hasCategories(): boolean {
    return this.categoryWithContract?.length > 0;
  }

  public onView(category: ICategory): void {
    this.store.dispatch(loadUserSettingContractByCategoryIdAction({ id: category?.id }));

    const dialogRef = this.dialog.open(ContractCategoryListDialogComponent, {
      width: '650px',
      height: '350px',
      data: { category }
    });
    dialogRef.afterClosed()
      .subscribe(result => {

      });
  }

  public onDelete(category: ICategory): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        const { id } = category;
        if (result && id) {
          this.store.dispatch(deleteUserSettingCategoryAction({ id }));
        }
      });
  }
}
