import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { IContractCategory, IContractCategoryReponse } from 'src/app/modules/contracts/contract.model';
import { getAllContractCategoriesSelector } from 'src/app/modules/contracts/store/selectors/contract-category.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-contract-category-import',
  templateUrl: './contract-category-import.component.html',
  styleUrls: ['./contract-category-import.component.scss']
})
export class ContractCategoryImportComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  public contractCategories: any[] = [];
  public selectedCategories: any;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractCategoryImportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getAllContractCategoriesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe((res: IContractCategoryReponse[]) => {
        this.contractCategories = res.map(c => {
          return {
            id: c.id,
            category: {
              id: c.category.id,
              category_name: c.category.category_name,
            },
            contract: {
              id: c.contract.id,
              contract_name: c.contract.contract_name
            }
          }
        })
      })
  }

  public onImport(): void {
    this.dialogRef.close(this.selectedCategories)
  }
}
