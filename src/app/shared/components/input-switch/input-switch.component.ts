import { IContractTerm } from './../../../modules/contracts/contract.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'il-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})

export class InputSwitchComponent implements OnInit {
  @Output()
  public onToggle = new EventEmitter<IContractTerm>();
  constructor() { }

  ngOnInit() { }
}
