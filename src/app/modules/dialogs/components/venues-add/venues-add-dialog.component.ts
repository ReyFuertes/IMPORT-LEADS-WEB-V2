import { take, map, debounceTime } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { convertBlobToBase64 } from 'src/app/shared/util/convert-to-blob';
import { v4 as uuid } from 'uuid';
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
  public base64Image: any;

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

  public uploadImage(event: any): void {
    const file: File = event.target.files[0];
    convertBlobToBase64(file)
      .pipe(take(1),
        map(b64Result => {
          return {
            id: uuid(),
            image: b64Result,
            filename: `${uuid()}.${file.name.split('?')[0].split('.').pop()}`,
            file: file,
            size: file.size,
            mimetype: file.type
          }
        }))
      .subscribe(b64 => {
        this.base64Image = b64.image;
      })
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
