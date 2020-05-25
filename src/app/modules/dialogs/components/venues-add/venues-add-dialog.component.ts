import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';

@Component({
  selector: 'il-venues-add-dialog',
  templateUrl: './venues-add-dialog.component.html',
  styleUrls: ['./venues-add-dialog.component.scss']
})
export class VenuesAddDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public form: FormGroup;
  public isProduct: boolean;
  public selectedItems: ISimpleItem[] = [];

  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<VenuesAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.isProduct = data;
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      location: [null],
      contact: [null],
      phone: [null],
    });
  }

  ngOnInit() {
  }

  public getBg(base64: string): string {
    return `url(${base64})`;
  }

  public handleSelectChange(event: any): void {
    event.value.forEach(item => {
      this.selectedItems.push(item);
    });

    this.selectedItems = this.selectedItems.filter((thing, i, arr) => {
      return arr.indexOf(arr.find(t => t.value === thing.value)) === i;
    });
  }

  public onRemove(value: string): void {
    this.selectedItems = this.selectedItems.filter(item => item.value !== value);
  }

}
