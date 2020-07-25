import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Input, Output, EventEmitter, Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class GenericDestroyPageComponent implements OnDestroy {
  public $unsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
