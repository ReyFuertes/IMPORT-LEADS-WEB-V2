import { ISimpleItem } from './../../generics/generic.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'il-dropdown-select-row',
  templateUrl: './dropdown-select-row.component.html',
  styleUrls: ['./dropdown-select-row.component.scss']
})

export class DropdownSelectRowComponent implements OnInit, OnChanges {
  @Input()
  public items: ISimpleItem[];
  @Input()
  public selectedItem: any;
  @Input()
  public placeholder: string;
  constructor() {

  }
  @Output()
  public valueEmitter = new EventEmitter<ISimpleItem>();
  public options: any;
  ngOnInit() {
    this.options = this.items;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes.selectedItem && changes.selectedItem.currentValue) {
      this.selectedItem = changes.selectedItem.currentValue;
    }
  }
}
