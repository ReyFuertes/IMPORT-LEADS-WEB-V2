import { FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})

export class TextareaComponent implements OnInit {
  @Input() public controlName: FormControlName;
  @Input() public form: FormGroup;
  @Input() public placeholder: string;
  @Input() public rows: number = 3;
  @Input() public isFloatLabel: boolean = false;
  @Input() public noResize: boolean = false;
  @Input() public hasBorder: boolean = false;
  constructor() { }

  ngOnInit() { }
}
