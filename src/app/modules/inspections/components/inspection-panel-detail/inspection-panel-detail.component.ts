import { ISimpleItem } from './../../../../shared/generics/generic.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-inspection-panel-detail',
  templateUrl: './inspection-panel-detail.component.html',
  styleUrls: ['./inspection-panel-detail.component.scss']
})

export class InspectionPanelDetailComponent implements OnInit {
  @Input()
  public products: ISimpleItem[];
  constructor() { }

  ngOnInit() { }
}
