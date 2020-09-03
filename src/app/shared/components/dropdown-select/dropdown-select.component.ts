import { ISimpleItem } from './../../generics/generic.model';
import { GenericControl } from './../../generics/generic-control';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';

@Component({
  selector: 'il-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})

export class DropdownSelectComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input()  public items: ISimpleItem[];
  @Input()  public placeholder: string = '';
  @Input()  public controlName: FormControlName;
  @Input()  public form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    // if (this.form) {
    //   this.initValue = 1;
    // }
  }
}
