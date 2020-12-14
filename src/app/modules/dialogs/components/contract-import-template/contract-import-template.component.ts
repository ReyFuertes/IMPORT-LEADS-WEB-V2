import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-contract-import-template',
  templateUrl: './contract-import-template.component.html',
  styleUrls: ['./contract-import-template.component.scss']
})
export class ContractImportTemplateComponent  extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  public contractCategories: any[] = [];
  public selectedCategories: any;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractImportTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super();
  }

  ngOnInit(): void {
    
  }

  public onImport(): void {
    this.dialogRef.close(this.selectedCategories)
  }
}
