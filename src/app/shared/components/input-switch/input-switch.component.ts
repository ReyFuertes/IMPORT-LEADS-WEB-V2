import { IContractTerm } from './../../../modules/contracts/contract.model';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'il-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})

export class InputSwitchComponent implements OnInit, OnChanges {
  @Input()
  public checked: boolean = false;
  @Output()
  public onToggle = new EventEmitter<IContractTerm>();
  constructor() { }

  ngOnInit() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.checked.currentValue) {
      this.checked = changes.checked.currentValue;
    }
  }
}
