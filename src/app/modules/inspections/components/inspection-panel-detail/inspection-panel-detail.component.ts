import { Component, OnInit, Input } from '@angular/core';
import { IActiveInspection } from '../../inspections.models';

@Component({
  selector: 'il-inspection-panel-detail',
  templateUrl: './inspection-panel-detail.component.html',
  styleUrls: ['./inspection-panel-detail.component.scss']
})

export class InspectionPanelDetailComponent implements OnInit {
  @Input() public detail: IActiveInspection;

  constructor() { }

  ngOnInit() {
  }

  public get getProducts(): any {
    return this.detail.products.map(ci => {
      return {
        label: ci.product_name,
        value: ci.id
      };
    })
  }
}
