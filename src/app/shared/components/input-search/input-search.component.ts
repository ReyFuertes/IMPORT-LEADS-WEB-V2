import { environment } from './../../../../environments/environment';
import { FormControlName, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})

export class InputSearchComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public placeholder: string;
  @Input()
  public controlName: FormControlName;
  @Input()
  public form: FormGroup;
  @Input()
  public isFloatLabel: boolean = false;
  constructor() { }

  ngOnInit() { }
}
