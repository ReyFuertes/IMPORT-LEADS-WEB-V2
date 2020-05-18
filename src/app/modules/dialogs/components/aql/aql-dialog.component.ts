import { environment } from './../../../../../environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'il-aql-dialog',
  templateUrl: './aql-dialog.component.html',
  styleUrls: ['./aql-dialog.component.scss']
})

export class AQLDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AQLDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      id: [''],
      packagingAql: [null],
      apprearanceAql: [null],
      techMeasurementsAql: [null],
      materialsAql: [null]
    });
  }

  ngOnInit() { }
}
