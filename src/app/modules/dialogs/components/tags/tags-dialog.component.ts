import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-tags-dialog',
  templateUrl: './tags-dialog.component.html',
  styleUrls: ['./tags-dialog.component.scss']
})
export class TagsDialogComponent implements OnInit {

  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<TagsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      tag: [null, Validators.required],
    }); }

  ngOnInit() {
  }

}
