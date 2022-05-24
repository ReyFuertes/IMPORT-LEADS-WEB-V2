import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, forkJoin } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { passwordValidator } from 'src/app/shared/util/validator';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { ValidatePublicUserPasswordAction } from '../../store/public.actions';
import { getIsPasswordChangedSelector, getPublicEmailTokenSelector } from '../../store/public.selectors';

@Component({
  selector: 'il-confirm-change-password',
  templateUrl: './confirm-change-password.component.html',
  styleUrls: ['./confirm-change-password.component.scss']
})
export class ConfirmChangePasswordComponent extends GenericDestroyPageComponent implements AfterViewInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public id: string;
  public changePasswordSuccessful: boolean;
  public isChangedPassword: boolean = false;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, private store: Store<AppState>, public translateService: TranslateService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]],
      token: [null, Validators.required],
      website_url: [null]
    }, {
      validator: passwordValidator('password', 'confirm_password')
    });
  }

  ngAfterViewInit(): void {
    combineLatest([
      this.store.pipe(select(getPublicEmailTokenSelector)),
      this.store.pipe(select(getUserLangSelector))
    ])
    .pipe(takeUntil(this.$unsubscribe), debounceTime(300))
    .subscribe(([emailToken, language]) => {
      if (emailToken?.email && emailToken?.token) {
        this.form.get('username').patchValue(emailToken?.email, { emitEvent: false });
        this.form.get('token').patchValue(emailToken?.token, { emitEvent: false });
        this.form.get('website_url').patchValue(emailToken?.website_url, { emitEvent: false });
      }
      this.isChangedPassword = !!emailToken?.email;
      this.translateService.use(language);
      this.cdRef.detectChanges();
    });

    this.store.pipe(select(getIsPasswordChangedSelector))
      .subscribe(isPasswordChanged => this.changePasswordSuccessful = isPasswordChanged);
  }

  public done(): void {
    window.location.href = this.form.get('website_url').value;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(ValidatePublicUserPasswordAction({
        payload: this.form.value
      }))
    }
  }
}
