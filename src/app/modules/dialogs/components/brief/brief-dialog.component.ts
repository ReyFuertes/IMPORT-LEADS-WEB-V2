import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'il-brief-dialog',
  templateUrl: './brief-dialog.component.html',
  styleUrls: ['./brief-dialog.component.scss']
})

export class BriefDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BriefDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      id: ['']
    });
  }

  ngOnInit() { }
}
