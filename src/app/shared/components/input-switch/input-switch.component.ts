import { IContractTerm } from './../../../modules/contracts/contract.model';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'il-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputSwitchComponent implements OnInit, OnChanges {
  @Input() public checked: boolean = false;
  @Input() public disabled: boolean = false;
  @Output() public onToggle = new EventEmitter<IContractTerm>();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.disabled && changes.disabled.currentValue) {
      this.disabled = changes.disabled.currentValue;
    }
    if (changes && changes.checked && changes.checked.currentValue) {
      this.checked = changes.checked.currentValue;
    }
    this.cdRef.detectChanges();
  }
}
