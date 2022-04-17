import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from './../../../../../environments/environment';
import { Component, Inject } from '@angular/core';

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
  }, {
    label: 'Delete and Navigate to',
    message: 'Are you sure to delete the current inspection run?'
  }, {
    label: 'Copy',
    message: 'Are you sure to create a copies the current inspection run?'
  }, {
    label: 'Save Template',
    message: 'Are you sure you want to save this contract as template?'
  }, {
    label: 'Select Product',
    message: 'Select a product before going to the next record.'
  }, {
    label: 'Delete',
    message: 'Do you want to delete last run item?'
  }, {
    label: 'Yes',
    message: 'Do you want to associate this category to a contract?'
  }, {
    label: 'Remove',
    message: 'Do you want to remove this category to a contract?'
  }];

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public get isColorPrimary(): boolean {
    return this.data?.action === 2 || this.data?.action === 3 || this.data?.action === 6;
  }

  public get isCloseOnly(): boolean {
    return this.data?.isCloseOnlyOption ? true : false;
  }

  public get isYesNoLabels(): boolean {
    return this.data?.yesNoLabels ? true : false;
  }
}
