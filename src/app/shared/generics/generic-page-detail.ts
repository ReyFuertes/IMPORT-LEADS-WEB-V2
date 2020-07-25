import { FormGroup } from '@angular/forms';
import { GenericDestroyPageComponent } from './generic-destroy-page';
export abstract class GenericPageDetailComponent<T> extends GenericDestroyPageComponent {
  public entity: T;
  public form: FormGroup;

  constructor() {
    super();
  }
}
