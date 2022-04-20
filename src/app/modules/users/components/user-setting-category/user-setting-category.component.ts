import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategoryContract } from 'src/app/modules/contracts/contract.model';
import { deleteCategoryAction } from 'src/app/modules/contracts/store/actions/category.action';
import { deleteContractCategoryAction} from 'src/app/modules/contracts/store/actions/contract-category.action';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { getUserSettingCategoriesWithContractSelector } from '../../store/selectors/user-setting.selector';

@Component({
  selector: 'il-user-setting-category',
  templateUrl: './user-setting-category.component.html',
  styleUrls: ['./user-setting-category.component.scss']
})
export class UserSettingCategoryComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public items: MenuItem[];
  public $contracts: Observable<ISimpleItem[]>;
  public categoriesWithContract: ICategoryContract[];

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserSettingCategoriesWithContractSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(categoriesWithContract => {
        this.categoriesWithContract = categoriesWithContract;
      });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onEdit(): void { }

  public contractToSimpleItem(value: any): ISimpleItem {
    return value?.id;
  }

  public get hasRecords(): boolean {
    return this.categoriesWithContract?.length > 0;
  }

  public onDelete(categoryContract: ICategoryContract): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        const { id } = categoryContract;
        if (result && id) {
          this.store.dispatch(deleteCategoryAction({ id }));
        }
      });
  }
}
