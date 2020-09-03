import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getAllRolesSelector, getAccessSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'il-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public formUser: FormGroup;
  public formUserProfile: FormGroup;
  public $roles: Observable<ISimpleItem[]>;
  public $access: Observable<ISimpleItem[]>;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.formUser = this.fb.group({
      id: [''],
      username: [''],
      password: [''],
      firstname: [''],
      lastname: [''],
      company_name: [''],
      phone: [''],
      email: [''],
      access: [null],
      role: [null]
    });

    this.formUserProfile = this.fb.group({
      position: [null, Validators.required],
      role: [null, Validators.required],
      company_address: [null],
      company_linkedin: [null],
      company_name: [null, Validators.required],
      email: [null],
      facebook: [null],
      firstname: [null],
      image: [null],
      lastname: [null],
      phone: [null],
      qqid: [null],
      self_intro: [null],
      twitter: [null],
      wechatid: [null]
    })

    this.$access = this.store.pipe(select(getAccessSelector));
    this.$roles = this.store.pipe(select(getAllRolesSelector))
  }

  ngOnInit(): void { }

  public onSave(): void {

  }
}
