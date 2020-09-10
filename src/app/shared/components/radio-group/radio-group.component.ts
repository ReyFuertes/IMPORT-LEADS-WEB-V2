import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {
  @Input() public options: ISimpleItem[];
  @Input() public name: string;
  @Input() public selected: string;

  @Output() public valueEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  public isSelected(value: any): boolean {
    return this.selected === value;
  }

}
