import { AfterContentInit, ChangeDetectorRef, Directive, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDestroyPageComponent } from './generic-destroy-page';

@Directive()
export class GenericPageDetailComponent<T> extends GenericDestroyPageComponent implements AfterViewInit {
  public entity: T;
  public form: FormGroup;

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  public ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
