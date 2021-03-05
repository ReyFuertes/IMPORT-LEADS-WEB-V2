import { tap, debounceTime } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { loginAction, isLoggingInAction } from '../../store/auth.action';
import { getIsLoggingInSelector, getIsLoginFailedSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { textRegex } from 'src/app/shared/util/text';
import { emailRegex } from 'src/app/shared/util/email';

@Component({
  selector: 'il-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public $isLogging: Observable<boolean>;
  public $isLoginFailed: Observable<boolean>;
  public hasError: boolean = false;
  public failedMsg: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required],
      // company: ['Test Company', Validators.required],
    });
  }

  ngOnInit() {
    this.$isLogging = this.store.pipe(select(getIsLoggingInSelector));
    this.$isLoginFailed = this.store.pipe(select(getIsLoginFailedSelector), debounceTime(1000));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.store.dispatch(isLoggingInAction());
      this.store.dispatch(loginAction({ cred: { username, password } }));
    }
  }
}
