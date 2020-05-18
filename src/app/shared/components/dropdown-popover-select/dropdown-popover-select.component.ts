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
  public items: any[] = [
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' }
  ];
  public valueEmitter = new EventEmitter<ISimpleItem>();

  constructor() { }

  ngOnInit() { }
}
