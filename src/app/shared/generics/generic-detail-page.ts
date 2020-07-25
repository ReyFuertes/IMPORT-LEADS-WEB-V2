import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericDestroyPageComponent } from './generic-destroy-page';

export class GenericDetailPageComponent extends GenericDestroyPageComponent {
  public form: FormGroup;

  constructor() {
    super();
  }
}
