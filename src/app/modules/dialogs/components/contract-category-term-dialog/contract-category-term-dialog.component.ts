import { environment } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-category-term-dialog',
  templateUrl: './contract-category-term-dialog.component.html',
  styleUrls: ['./contract-category-term-dialog.component.scss']
})

export class ContractCategoryTermDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractCategoryTermDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      term_name: [null, [Validators.required]],
    });
  }

  ngOnInit() { }
}
