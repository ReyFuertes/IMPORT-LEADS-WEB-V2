import { environment } from './../../../../environments/environment';
import { ISimpleItem } from './../../generics/generic.model';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'il-dropdown-popover-select',
  templateUrl: './dropdown-popover-select.component.html',
  styleUrls: ['./dropdown-popover-select.component.scss']
})

export class DropdownPopoverSelectComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public selectedItem: ISimpleItem = { label: 'Select Tag' };
  public items: any[] = [];
  public valueEmitter = new EventEmitter<ISimpleItem>();

  constructor() { }

  ngOnInit() { }
}
