import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-category-title-dialog',
  templateUrl: './contract-category-title-dialog.component.html',
  styleUrls: ['./contract-category-title-dialog.component.scss']
})

export class ContractCategoryTitleDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractCategoryTitleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: [null, Validators.required],
    }); }

  ngOnInit() { }
}
