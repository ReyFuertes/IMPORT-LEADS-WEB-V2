import { environment } from './../../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalStateType } from 'src/app/models/generic.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { InspectionChecklistService } from 'src/app/modules/inspections/inspections.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'il-inspection-comment',
  templateUrl: './inspection-comment-dialog.component.html',
  styleUrls: ['./inspection-comment-dialog.component.scss']
})

export class InspectionCommentDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(private insChecklistSrv: InspectionChecklistService, private store: Store<AppState>, public fb: FormBuilder,
    public dialogRef: MatDialogRef<InspectionCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      comments: [null, Validators.required],
      images: [null]
    });
  }

  ngOnInit() {
    if (ModalStateType.edit && this.data?.id) {
      this.insChecklistSrv.getById(this.data?.id)
        .pipe(tap((res: any) => {
          const { comment } = res.shift();
          this.form.get('comments').patchValue(comment);
        }))
        .subscribe();
    }
  }

  public onSave(): void {
    this.dialogRef.close(this.form.value)
  }
}
