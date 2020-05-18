import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-tags-question-dialog',
  templateUrl: './tags-question-dialog.component.html',
  styleUrls: ['./tags-question-dialog.component.scss']
})
export class TagsQuestionDialogComponent implements OnInit {

  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<TagsQuestionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      tagQuestion: [null, Validators.required],
    }); }

  ngOnInit() {
  }

}
