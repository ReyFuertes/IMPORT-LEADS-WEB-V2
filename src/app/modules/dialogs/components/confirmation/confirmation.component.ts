import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'il-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent {
  public svgPath: string = environment.svgPath;
  public actionText: any[] = [{
    label: 'Delete',
    message: 'Are you sure to delete this item?'
  }, {
    label: 'Override',
    message: 'Are you sure to Override this item?'
  }, {
    label: 'Apply Changes',
    message: 'Are you sure to apply changes to this item?'
  }, {
    label: 'Pause',
    message: 'Are you sure to pause the inspection run?'
  }, {
    label: 'Stop',
    message: 'Are you sure to stop the inspection run?'
  }];

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public get isColorPrimary(): boolean {
    return this.data?.action === 2 || this.data?.action === 3;
  }
}
