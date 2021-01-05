import { FormGroup } from '@angular/forms';
import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { GenericDestroyPageComponent } from './generic-destroy-page';
import { environment } from 'src/environments/environment';

@Directive()
export class GenericControl<T> extends GenericDestroyPageComponent {
  @Input() public placeholder: string;
  @Input() public options: Array<T>;
  @Input() public item: T;
  @Input() public controlName: any;
  @Input() public form: FormGroup;
  @Input() public isFloatLabel: boolean = false;
  @Input() public selectedItem: T;

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  @Output() public valueEmitter = new EventEmitter<T>();

  public get hasError(): boolean {
    return this.form
      && this.form?.get(this.controlName)?.errors
      && this.form?.get(this.controlName)?.touched
      || !this.form?.get(this.controlName)?.valid;
  }
}
