import { AppState } from './../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(private store: Store<AppState>, public fb: FormBuilder,
    public dialogRef: MatDialogRef<VenuesAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
    this.isProduct = data;
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      location: [null],
      contact: [null],
      phone: [null],
      image: [null],
      file: [null],
    });
  }

  ngOnInit() {
  }

  public uploadImage(event: any): void {
    const file: File = event.target.files[0];
    const filename = `${uuid()}.${file.name.split('?')[0].split('.').pop()}`;
    convertBlobToBase64(file)
      .pipe(take(1),
        map(b64Result => {
          return {
            id: uuid(),
            image: b64Result,
            filename,
            file: file,
            size: file.size,
            mimetype: file.type
          }
        }))
      .subscribe(b64 => {
        if (b64) {
          this.base64Image = b64.image;
          this.form.get('image').patchValue(b64);

          /* add the binary file so it can be inserted in the image upload endpoint */
          const dataFile = new FormData();
          dataFile.append('file', file, filename);
          this.form.get('file').patchValue(dataFile);
        }
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
