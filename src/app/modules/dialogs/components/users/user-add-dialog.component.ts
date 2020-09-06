import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { Store, select } from '@ngrx/store';
import { getAccessSelector, getAllRolesSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Observable } from 'rxjs';
import { addUserAction, signUpUserAction } from 'src/app/modules/user-management/store/user-mgmt.actions';
import { getCreatingUserSelector } from 'src/app/modules/user-management/store/user-mgmt.selectors';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';

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
      username: [''],
      password: [''],
      firstname: [''],
      lastname: [''],
      company_name: [''],
      phone: [''],
      access: [null],
      role: [null]
    });

    //manually mark as valid if has value
    this.form && this.form.get('role').valueChanges.pipe(take(1)).subscribe(res => {
      if (res) this.form.controls['role'].setErrors(null);
    })

    this.$access = this.store.pipe(select(getAccessSelector));
    this.$roles = this.store.pipe(select(getAllRolesSelector))
  }

  ngOnInit() {

  }

  public onSave(): void {
    if (this.form.value && this.form.valid) {
      const { username, password } = this.form.value;

      this.store.dispatch(signUpUserAction({
        payload: { username, password }
      }));

      setTimeout(() => {
        this.store.dispatch(addUserAction({
          payload: {
            username,
            password,
            user_profile: {
              email: this.form.get('email').value,
              phone: this.form.get('phone').value,
              company_name: this.form.get('company_name').value,
              firstname: this.form.get('firstname').value,
              lastname: this.form.get('lastname').value,
            },
            user_access: this.form.get('access').value,
            user_role: this.form.get('role').value,
          }
        }));
        this.dialogRef.close();
      }, 1000);
    }
  }

  public handleSelectChange(role: any) { }

}
