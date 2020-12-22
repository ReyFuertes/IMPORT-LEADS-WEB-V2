import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { loadContractTemplatesAction } from 'src/app/modules/contracts/store/actions/contract-template.action';
import { getContractTemplatesSelector } from 'src/app/modules/contracts/store/selectors/contract-template.selector';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-contract-import-template',
  templateUrl: './contract-import-template.component.html',
  styleUrls: ['./contract-import-template.component.scss']
})
export class ContractImportTemplateDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  public contractTemplates: any[] = [];
  public selectedContractTemplate: any;

  constructor(private store: Store<AppState>, public dialogRef: MatDialogRef<ContractImportTemplateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    super();
    this.store.dispatch(loadContractTemplatesAction());
  }

  ngOnInit(): void {
    this.store.pipe(select(getContractTemplatesSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) this.contractTemplates = res;
      })
  }

  public onImport(): void {
    this.dialogRef.close(this.selectedContractTemplate)
  }
}
