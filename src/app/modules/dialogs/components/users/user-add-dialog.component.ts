import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-add-dialog',
  templateUrl: './user-add-dialog.component.html',
  styleUrls: ['./user-add-dialog.component.scss']
})
export class UserAddDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public roles: Array<{ id: number, label: string }> = [
    {
      id: 1,
      label: 'Admin'
    },
    {
      id: 2,
      label: 'Inspector'
    },
    {
      id: 3,
      label: 'Manager'
    },
  ];

  public accesses: Array<{ id: number, label: string }> = [
    {
      id: 1,
      label: 'Contracts'
    },
    {
      id: 2,
      label: 'Inspections'
    },
    {
      id: 3,
      label: 'Executing Inspections'
    },
    {
      id: 4,
      label: 'Data Pages'
    },
    {
      id: 5,
      label: 'Platform Settings'
    },
    {
      id: 5,
      label: 'Chat'
    },
  ];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UserAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) {
    this.form = this.fb.group({
      id: [''],
      name: [''],
      role: [null],
      company: [''],
      phone: [''],
      email: [''],
      username: [''],
      password: [''],
      access: [null],
    });
    //manually mark as valid if has value
    this.form && this.form.get('role').valueChanges.pipe(take(1)).subscribe(res => {
      if (res) this.form.controls['role'].setErrors(null);
    })
  }

  ngOnInit() { }

  public handleSelectChange(role: any) { }

}
