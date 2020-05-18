import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'il-contract-select-dialog',
  templateUrl: './contract-select-dialog.component.html',
  styleUrls: ['./contract-select-dialog.component.scss']
})
export class ContractSelectDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public contracts: Array<{ label: string, value?: number | string}> = [
    {
      label: 'PI SK9NL0806 Touch Dimmer Switch 1',
      value: 1
    },
    {
      label: 'PI SK9NL0806 Touch Dimmer Switch 2',
      value: 2
    },
    {
      label: 'PI SK9NL0806 Touch Dimmer Switch 3',
      value: 3
    }
  ];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ContractSelectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      contract: [null, Validators.required],
    }); }

  ngOnInit() {
  }

  public handleSelectChange(event: any) {
    // todo
  }
}
