import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-contract-template-dialog',
  templateUrl: './contract-template-dialog.component.html',
  styleUrls: ['./contract-template-dialog.component.scss']
})
export class ContractTemplateDialogComponent {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractTemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
    });
  }

  public onSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
