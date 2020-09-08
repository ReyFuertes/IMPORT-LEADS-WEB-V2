import { ISimpleItem } from './../../../../shared/generics/generic.model';
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
    console.log(this.detail)
  }

  public get getProducts(): any {
    return this.detail.checklist_items.map(ci => {
      return {
        label: ci.contract_product.product.product_name,
        value: ci.contract_product.product.id
      };
    })
  }
}
