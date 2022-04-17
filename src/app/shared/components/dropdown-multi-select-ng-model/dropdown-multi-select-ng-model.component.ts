import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-dropdown-multi-select-ng-model',
  templateUrl: './dropdown-multi-select-ng-model.component.html',
  styleUrls: ['./dropdown-multi-select-ng-model.component.scss']
})
export class DropdownMultiSelectNgModelComponent extends GenericControl<ISimpleItem> {
  @Input() public searchItem: boolean = false;
  @Input() public maxSelectedLabels: number = 1;
  @Input() public filter: boolean = true;
  @Input() public selectedItems: any;
  @Input() public selectedItemsLabel: string = '{0} selected';

  constructor() {
    super();
  }

  public handleValueChange(): void {
    this.valueEmitter.emit(this.selectedItems);
  }
}
