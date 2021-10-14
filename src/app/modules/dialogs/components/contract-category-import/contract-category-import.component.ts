import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { loadCategoryTemplatesAction } from 'src/app/modules/contracts/store/actions/Category-template.action';
import { getCategoryTemplatesSelector } from 'src/app/modules/contracts/store/selectors/category-template.selector';
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

  public contractCategories: any[] = [];
  public selectedCategories: any;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractCategoryImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super();

    this.store.dispatch(loadCategoryTemplatesAction());
  }

  ngOnInit(): void {
    this.store.pipe(select(getCategoryTemplatesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) this.contractCategories = res
      })
  }

  public onImport(): void {
    this.dialogRef.close(this.selectedCategories);
  }
}
