import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { ICategory, IContractCategoryReponse } from 'src/app/modules/contracts/contract.model';
import { getUserSettingContractsByCategoryIdSelector } from 'src/app/modules/users/store/selectors/user-setting.selector';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'il-contract-category-list-dialog',
  templateUrl: './contract-category-list-dialog.component.html',
  styleUrls: ['./contract-category-list-dialog.component.scss']
})
export class ContractCategoryListDialogComponent implements OnInit {
  public contractsByCategory: IContractCategoryReponse[];

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractCategoryListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ICategory }) {
  }
  ngOnInit(): void {
    this.store.pipe(select(getUserSettingContractsByCategoryIdSelector))
      .subscribe(contractsByCategory => {
        console.log(contractsByCategory)
        this.contractsByCategory = contractsByCategory;
      })
  }

  public get getCategoryName(): string {
    return this.data?.category?.category_name || '';
  }

  public get hasRecord(): boolean {
    return this.contractsByCategory?.length > 0;
  }
}
