import { AddEditState } from './generic.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
export abstract class GenericAddEditComponent<T> {
  public entity: T;
  public form: FormGroup;
  @Input()
  public state: AddEditState;
  constructor() { }
  public abstract save: (entity: T) => void;
}
