import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';

@Component({
  selector: 'il-products-add-dialog',
  templateUrl: './products-add-dialog.component.html',
  styleUrls: ['./products-add-dialog.component.scss']
})
export class ProductAddDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public isProduct: boolean;
  public selectedItems: ISimpleItem[] = [];
  public items: ISimpleItem[] = [];

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {

    this.form = this.fb.group({
      id: [null],
      product_name: [null, [Validators.required]],
      // qty: [null, [Validators.required]],
      // cost: [null, [Validators.required]]
    });
  }

  ngOnInit() { }
}
