import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory, ICategoryTemplate, IContractCategoryTemplate } from 'src/app/modules/contracts/contract.model';
import { deleteContractCategoryTemplateAction } from 'src/app/modules/contracts/store/actions/contract-category-template.action';
import { getContractCategoryTemplatesSelector } from 'src/app/modules/contracts/store/selectors/contract-category-template.selector';
import { ConfirmationComponent } from 'src/app/modules/dialogs/components/confirmation/confirmation.component';
import { ContractCategoryListDialogComponent } from 'src/app/modules/dialogs/components/contract-category-list-dialog/contract-category-list-dialog.component';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { associateCategoryTemplateToContractAction, deleteUserSettingTemplateCategoryAction, loadUserSettingContractByCategoryIdAction } from '../../store/actions/user-setting.action';
import { getContractAsOptionSelector, getUserSettingCategoryTemplatesSelector } from '../../store/selectors/user-setting.selector';

@Component({
  selector: 'il-user-setting-category',
  templateUrl: './user-setting-category.component.html',
  styleUrls: ['./user-setting-category.component.scss']
})
export class UserSettingCategoryComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit {
  public items: MenuItem[];
  public $contracts: Observable<ISimpleItem[]>;
  public contractCategoryTemplates: IContractCategoryTemplate[];

  constructor(private cdRef: ChangeDetectorRef, private dialog: MatDialog, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    this.$contracts = this.store.pipe(select(getContractAsOptionSelector));

    this.store.pipe(select(getContractCategoryTemplatesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(contractCategoryTemplates => this.contractCategoryTemplates = contractCategoryTemplates);
  }

  public handleValueChange(template: ICategoryTemplate, contract: ISimpleItem): void {
    this.store.dispatch(associateCategoryTemplateToContractAction({
      payload: {
        id: template?.id,
        category: template?.category,
        contract_category: template?.contract_category,
        contract
      }
    }));
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  public onEdit(): void { }

  public contractToSimpleItem(value: any): ISimpleItem {
    return value?.id;
  }

  public get hasRecords(): boolean {
    return this.contractCategoryTemplates?.length > 0;
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

  public onDelete(category: IContractCategoryTemplate): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '410px',
      data: { action: 0 }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        const { id, category_template, contract_category, contract } = category;
        if (result && id && category_template && contract_category && contract) {
          this.store.dispatch(deleteContractCategoryTemplateAction({
            id,
            category_template_id: category_template?.id,
            contract_category_id: contract_category?.id,
            contract_id: contract?.value
          }));
        }
      });
  }
}
