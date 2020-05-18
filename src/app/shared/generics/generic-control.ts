import { FormGroup } from '@angular/forms';
import { Input, Output, EventEmitter } from '@angular/core';

export class GenericControl<T> {
  @Input()
  public placeholder: string;
  @Input()
  public items: Array<T>;
  @Input()
  public item: T;
  @Input()
  public controlName: any;
  @Input()
  public form: FormGroup;
  @Output()
  public valueEmitter = new EventEmitter<T>();
}
