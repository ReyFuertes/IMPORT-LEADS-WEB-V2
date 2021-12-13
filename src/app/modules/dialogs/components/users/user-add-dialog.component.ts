import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store, select } from '@ngrx/store';
import { getAllAccessSelector, getAllRolesSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Observable } from 'rxjs';
import { addUserAction, signUpUserAction } from 'src/app/modules/user-management/store/user-mgmt.actions';
import { getCreatingUserSelector } from 'src/app/modules/user-management/store/user-mgmt.selectors';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { emailRegex } from 'src/app/shared/util/email';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public $roles: Observable<ISimpleItem[]>;
  public $access: Observable<ISimpleItem[]>;

  constructor(private store: Store<AppState>, public fb: FormBuilder, public dialogRef: MatDialogRef<UserAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    super();
    this.form = this.fb.group({
      id: [''],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      password: [null, Validators.required],
      user_profile: this.fb.group({
        phone: [null, Validators.required],
        company_name: [null, Validators.required],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
      }),
      user_access: [null, Validators.required],
      user_role: [null, Validators.required],
      termsConditions: [null, Validators.requiredTrue]
    });

    this.form.get('user_role').valueChanges
      .pipe(take(1))
      .subscribe(res => {
        if (res) this.form.controls['user_role'].setErrors(null);
      });

    this.$access = this.store.pipe(select(getAllAccessSelector));
    this.$roles = this.store.pipe(select(getAllRolesSelector))
  }

  ngOnInit() { }

  public onSave(): void {
    if (this.form.value && this.form.valid) {
      const payload = {
        ...this.form.value,
        username: String(this.form.value?.username).toLowerCase()
      }
      this.store.dispatch(signUpUserAction({ payload }));

      setTimeout(() => { this.dialogRef.close(); }, 500);
    }
  }
}
