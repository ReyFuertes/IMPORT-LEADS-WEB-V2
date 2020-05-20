import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'il-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit, OnChanges {
  @Input()
  public placeholder: string;
  @Input()
  public controlName: FormControlName;
  @Input()
  public form: FormGroup;
  @Input()
  public isFloatLabel: boolean = false;
  @Input()
  public isNumberOnly: boolean = false;
  @Input()
  public isRequired: boolean = false;
  @Input()
  public inputType: string = '';
  @Input()
  public inputMaxLen: number = 225;
  @Input()
  public isReadOnly: boolean = false;
  @Input()
  public showErrors: boolean = false;
  @Input()
  public isCenter: boolean = false;
  @Input()
  public hasBorder: boolean = false;
  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.isReadOnly && changes.isReadOnly.currentValue) {
      this.isReadOnly = changes.isReadOnly.currentValue;
    }
  }
}
