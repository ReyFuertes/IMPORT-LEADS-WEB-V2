import { ICategory } from './../../../contracts/contract.model';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-category-dialog',
  templateUrl: './contract-category-dialog.component.html',
  styleUrls: ['./contract-category-dialog.component.scss']
})

export class ContractCategoryDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractCategoryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { category: ICategory }) {
    this.form = this.fb.group({
      id: [null],
      category_name: [null, [Validators.required]]
    });

  }

  ngOnInit() {
    if (this.data && this.data.category) {
      this.form.get('id').patchValue(this.data.category.id);
      this.form.get('category_name').patchValue(this.data.category.category_name);
    }
  }
}
