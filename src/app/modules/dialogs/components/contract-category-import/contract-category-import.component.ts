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
export class ContractCategoryImportDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  public savedContracts: any[] = [];
  public selectedContract: any;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractCategoryImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super();
  }

  ngOnInit(): void {
 
  }

  public onImport(): void {
  }
}
