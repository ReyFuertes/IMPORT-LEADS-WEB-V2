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
  @Input() public disabled: boolean = false;

  @Output() public valueEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.disabled)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selected = changes?.selected?.currentValue;
    this.disabled = changes?.disabled?.currentValue;
    console.log(this.disabled)
  }

  public onChange(option: ISimpleItem): void {
    this.valueEmitter.emit(option)
  }
}
