import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { DropdownSelect } from './../../generics/generic.model';

@Component({
  selector: 'il-popover-multi-select',
  templateUrl: './popover-multi-select.component.html',
  styleUrls: ['./popover-multi-select.component.scss']
})
export class PopoverMultiSelectComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public options: DropdownSelect[];
  constructor() { }

  ngOnInit() {
  }

  public onSelectOption(option: DropdownSelect) {}

}
