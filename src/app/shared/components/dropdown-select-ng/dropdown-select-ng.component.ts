import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-ng',
  templateUrl: './dropdown-select-ng.component.html',
  styleUrls: ['./dropdown-select-ng.component.scss']
})

export class DropdownSelectNgComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() public showClear: boolean = false;
  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.selectedItem)
  }
}
