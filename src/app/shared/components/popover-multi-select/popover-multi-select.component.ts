import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISimpleItem } from './../../generics/generic.model';
import * as _ from 'lodash';

@Component({
  selector: 'il-popover-multi-select',
  templateUrl: './popover-multi-select.component.html',
  styleUrls: ['./popover-multi-select.component.scss']
})
export class PopoverMultiSelectComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public selOption: ISimpleItem[] = [];

  @Input() public options: ISimpleItem[] = [];
  @Input() public idx: any;
  @Input() public label: any;
  @Input() public values: string[] = [];

  @Output() public optionValuesEmitter = new EventEmitter<ISimpleItem>();

  constructor() { }

  ngOnInit() {
    this.selOption = this.options
      && this.options.filter(o => o.value === this.values.filter(v => o.value == v)[0]);
    console.log('selOption', this.selOption)

  }

  public get fmtSelValue(): string {
    return this.options && this.options
      .filter(o => this.selOption.filter(v => o.value == v.value)[0]).map(v => v.label).join(', ');
  }

  public isChecked(value: string): boolean {
    return this.values && this.values.filter(v => v === value).shift() ? true : false;
  }

  public onSelectOption(option: ISimpleItem, event: any) {
    if (event.checked) {
      this.selOption.push(option);
    } else {
      _.remove(this.selOption, { value: option.value });
    }
    this.optionValuesEmitter.emit(option);
  }

  public get getOptions(): string {
    return this.selOption && this.selOption.map(i => i.label).join(', ').toString();
  }

  public get hasOption(): boolean {
    return this.selOption && this.selOption.length > 0;
  }
}
