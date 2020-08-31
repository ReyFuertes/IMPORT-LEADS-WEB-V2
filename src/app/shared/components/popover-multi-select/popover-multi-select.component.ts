import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { IDropdownSelect, ISimpleItem } from './../../generics/generic.model';

@Component({
  selector: 'il-popover-multi-select',
  templateUrl: './popover-multi-select.component.html',
  styleUrls: ['./popover-multi-select.component.scss']
})
export class PopoverMultiSelectComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public selOption: ISimpleItem[] = [];

  @Input() public options: ISimpleItem[];
  @Input() idx: any;
  @Input() label: any;

  constructor() { }

  ngOnInit() { }

  public onSelectOption(option: ISimpleItem) {
    if (option) this.selOption.push(option);
  }

  public get getOptions(): string {
    return this.selOption && this.selOption.map(i => i.label).join(', ').toString();
  }

  public get hasOption(): boolean {
    return this.selOption && this.selOption.length > 0;
  }
}
