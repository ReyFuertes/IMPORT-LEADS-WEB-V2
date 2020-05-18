import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
  }

  ngOnInit() { }
}
