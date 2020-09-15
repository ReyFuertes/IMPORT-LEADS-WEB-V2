import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit, OnChanges {
  @Input() public options: ISimpleItem[];
  @Input() public name: string;
  @Input() public selected: string;

  @Output() public valueEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes && changes.selected && changes.selected.currentValue) {
    //   this.selected = changes.selected.currentValue;
    // }
  }

  public onChange(option: ISimpleItem): void {
    this.valueEmitter.emit(option)
  }

  public isSelected(value: any): boolean {
    return this.selected === value;
  }
}
