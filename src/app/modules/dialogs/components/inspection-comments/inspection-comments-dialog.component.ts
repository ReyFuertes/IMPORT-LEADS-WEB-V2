import { environment } from './../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'il-inspection-comments',
  templateUrl: './inspection-comments-dialog.component.html',
  styleUrls: ['./inspection-comments-dialog.component.scss']
})

export class InspectionCommentDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      comments: [null, Validators.required],
      images: [null]
    });
  }

  ngOnInit() { }
}
