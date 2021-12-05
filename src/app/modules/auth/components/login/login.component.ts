import { tap, debounceTime, takeUntil } from 'rxjs/operators';
import { AppState } from './../../../../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { loginAction, isLoggingInAction } from '../../store/auth.action';
import { getIsLoggingInSelector, getIsLoginFailedSelector, getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { emailRegex } from 'src/app/shared/util/email';
import { getLoginErrorSelector } from '../../store/auth.selector';
import { TranslateService } from '@ngx-translate/core';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends GenericDestroyPageComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public $isLogging: Observable<boolean>;
  public $isLoginFailed: Observable<boolean>;
  public hasError: boolean = false;
  public loginError: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private store: Store<AppState>, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required]
    });

    this.store.pipe(select(getLoginErrorSelector))
      .pipe(debounceTime(1000))
      .subscribe(res => {
        this.loginError = res;
      });
  }

  ngOnInit() {
    this.$isLogging = this.store.pipe(select(getIsLoggingInSelector));
    this.$isLoginFailed = this.store.pipe(select(getIsLoginFailedSelector), debounceTime(1000));

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }
  
  public onSubmit(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.store.dispatch(isLoggingInAction());
      this.store.dispatch(loginAction({
        cred: { username: String(username).toLowerCase(), password }
      }));
    }
  }
}
