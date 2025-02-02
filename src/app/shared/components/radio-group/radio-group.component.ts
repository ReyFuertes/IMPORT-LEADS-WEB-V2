import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnChanges {
  @Input() public options: ISimpleItem[];
  @Input() public selected: string;
  @Input() public disabled: boolean = false;

  @Output() public valueEmitter = new EventEmitter<any>();

  constructor(public translateService: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.selected?.currentValue) {
      this.selected = changes?.selected?.currentValue;
    }
    if (changes?.disabled?.currentValue) {
      this.disabled = changes?.disabled?.currentValue;
    }
  }

  public onChange(option: ISimpleItem): void {
    this.valueEmitter.emit(option)
  }
}
