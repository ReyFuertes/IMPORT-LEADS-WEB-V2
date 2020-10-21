import { AddEditState } from './generic.model';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { GenericDestroyPageComponent } from './generic-destroy-page';
@Directive()
export abstract class GenericAddEditComponent<T> extends GenericDestroyPageComponent {
  public entity: T;
  public form: FormGroup;
  @Input()
  public state: AddEditState;
  constructor() {
    super();
  }
  public abstract save: (entity: T) => void;
}
