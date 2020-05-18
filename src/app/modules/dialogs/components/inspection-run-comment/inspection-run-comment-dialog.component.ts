import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-inspection-run-comment-dialog',
  templateUrl: './inspection-run-comment-dialog.component.html',
  styleUrls: ['./inspection-run-comment-dialog.component.scss']
})

export class InspectionRunCommentDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionRunCommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      comment: [null, Validators.required],
    }); }

  ngOnInit() { }
}
