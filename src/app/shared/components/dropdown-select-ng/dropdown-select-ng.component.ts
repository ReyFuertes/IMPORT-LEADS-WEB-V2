import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-ng',
  templateUrl: './dropdown-select-ng.component.html',
  styleUrls: ['./dropdown-select-ng.component.scss']
})

export class DropdownSelectNgComponent extends GenericControl<ISimpleItem> {
  @Input() public showClear: boolean = false;

  constructor() {
    super();
  }

  public onChange(event: any): void {
    this.valueEmitter.emit(event?.value);
  }
}
