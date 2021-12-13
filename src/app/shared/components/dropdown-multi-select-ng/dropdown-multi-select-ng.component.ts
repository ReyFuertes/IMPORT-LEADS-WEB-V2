import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-dropdown-multi-select-ng',
  templateUrl: './dropdown-multi-select-ng.component.html',
  styleUrls: ['./dropdown-multi-select-ng.component.scss']
})
export class DropdownMultiSelectNGComponent extends GenericControl<ISimpleItem> implements OnInit, OnChanges {
  @Input() public searchItem: boolean = false;
  @Input() public maxSelectedLabels: number = 2;
  @Input() public filter: boolean = true;
  @Output() public valueEmitter = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.form && changes.form.currentValue) {
      this.form = changes.form.currentValue;
    }
    if (changes && changes.controlName && changes.controlName.currentValue) {
      this.controlName = changes.controlName.currentValue;
    }
  }
}
