import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { PasswordMatch } from 'src/app/shared/util/text';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import { changeUserPasswordAction } from '../../store/actions/user.actions';
import { getUserProfileSelector } from '../../store/selectors/user-profile.selector';

@Component({
  selector: 'il-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.scss']
})
export class UserChangePasswordComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;

  constructor(private store: Store<AppState>, public fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      id: [null, Validators.required],
      old_password: [null, Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_new_password: ['', Validators.required],
    }, {
      validator: PasswordMatch('new_password', 'confirm_new_password')
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserProfileSelector),
      takeUntil(this.$unsubscribe)).subscribe(res => {
        this.form.patchValue({ id: res?.id });
      })
  }

  public changePassword(): void {
    if (this.form.valid) {
      this.store.dispatch(changeUserPasswordAction({ payload: this.form.value }));
    }
  }
}
