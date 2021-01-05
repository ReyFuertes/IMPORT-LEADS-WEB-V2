import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent extends GenericControl<ISimpleItem> implements OnChanges {
  @Input() public isFloatLabel: boolean = false;
  @Input() public isNumberOnly: boolean = false;
  @Input() public isRequired: boolean = false;
  @Input() public inputType: string = 'text';
  @Input() public inputMaxLen: number = 225;
  @Input() public isReadOnly: boolean = false;
  @Input() public showErrors: boolean = false;
  @Input() public isCenter: boolean = false;
  @Input() public hasBorder: boolean = false;

  constructor(private cdref: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes?.isReadOnly && changes?.isReadOnly?.currentValue) {
      this.isReadOnly = changes?.isReadOnly?.currentValue;
    }
  }
}
