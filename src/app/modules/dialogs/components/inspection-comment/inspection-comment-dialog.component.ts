import { environment } from './../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalStateType } from 'src/app/models/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { getInsChecklistAction } from 'src/app/modules/inspections/store/actions/inspection-checklist.action';

@Component({
  selector: 'il-inspection-comment',
  templateUrl: './inspection-comment-dialog.component.html',
  styleUrls: ['./inspection-comment-dialog.component.scss']
})

export class InspectionCommentDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(private store: Store<AppState>, public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      comments: [null, Validators.required],
      images: [null]
    });
  }

  ngOnInit() {
    if (ModalStateType.edit) {
      console.log(this.data)
    }
  }
}
