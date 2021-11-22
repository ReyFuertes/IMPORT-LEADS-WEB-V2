import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { emailRegex } from 'src/app/shared/util/email';
import { passwordValidator } from 'src/app/shared/util/validator';
import { AppState } from 'src/app/store/app.reducer';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { isUserExistForChangePasswordAction } from '../../store/public.actions';
import { getPublicEmailSelector } from '../../store/public.selectors';

@Component({
  selector: 'il-auth-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends GenericDestroyPageComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public id: string;

  constructor(private router: Router, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private store: Store<AppState>, public translateService: TranslateService, private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirm_password: [null, [Validators.required, Validators.minLength(6)]],
    }, {
      validator: passwordValidator('password', 'confirm_password')
    });

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.dispatch(isUserExistForChangePasswordAction({ id: this.id }));
    } else {
      this.router.navigateByUrl('404');
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(getPublicEmailSelector), debounceTime(1000)).subscribe(email => {
      if (email) {
        this.form.get('username').patchValue(email);
      } else {
        this.router.navigateByUrl('404');
      }
    });
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
      console.log(this.form.value)
    }
  }
}
