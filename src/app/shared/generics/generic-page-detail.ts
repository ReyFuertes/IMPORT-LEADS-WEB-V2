import { AddEditState } from './generic.model';
import { FormBuilder, FormGroup } from '@angular/forms';
export abstract class GenericPageDetailComponent<T> {
  public entity: T;
  public form: FormGroup;
  constructor() { }
}
