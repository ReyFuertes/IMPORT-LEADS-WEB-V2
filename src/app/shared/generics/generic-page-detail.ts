import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDestroyPageComponent } from './generic-destroy-page';

@Directive()
export class GenericPageDetailComponent<T> extends GenericDestroyPageComponent {
  public entity: T;
  public form: FormGroup;

  constructor() {
    super();
  }
}
