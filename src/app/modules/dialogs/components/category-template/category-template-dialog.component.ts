import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-category-template-dialog',
  templateUrl: './category-template-dialog.component.html',
  styleUrls: ['./category-template-dialog.component.scss']
})
export class CategoryTemplateDialogComponent {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryTemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
    });
  }

  public onSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
