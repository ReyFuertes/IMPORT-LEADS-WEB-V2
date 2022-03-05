import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getAllRolesSelector, getAllAccessSelector, getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { saveUserAction } from '../../store/user-mgmt.actions';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { getUserByIdSelector } from '../../store/user-mgmt.selectors';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { emailRegex } from 'src/app/shared/util/email';
import { USERMNGMNTROUTE } from 'src/app/shared/constants/routes';
import { TranslateService } from '@ngx-translate/core';
import { IUserProfileResponse } from 'src/app/modules/users/users.models';

@Component({
  selector: 'il-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends GenericDestroyPageComponent implements OnInit, AfterViewInit, OnChanges {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public formUserProfile: FormGroup;
  public $roles: Observable<ISimpleItem[]>;
  public $access: Observable<ISimpleItem[]>;
  public id: string;
  public userMngmtRoute = USERMNGMNTROUTE;
  public fmtUserAccess: any;

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private route: ActivatedRoute, private store: Store<AppState>, private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      id: [null],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      user_access: [null],
      user_roles: [null],
      // password: [null, Validators.required],
      user_profile: this.fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        position: [null],
        company_address: [null],
        company_linkedin: [null],
        company_name: [null],
        email: [null],
        phone: [null],
        facebook: [null],
        image: [null],
        qqid: [null],
        self_intro: [null],
        twitter: [null],
        wechatid: [null]
      })
    });

    this.id = this.route.snapshot.paramMap.get('id') || null;
    if (this.id) {
      this.store.pipe(select(getUserByIdSelector(this.id)))
        .pipe(takeUntil(this.$unsubscribe)).subscribe((userProfile: IUserProfileResponse) => {
          if (userProfile) {
            const formValues = {
              ...userProfile?.user,
              user_profile: userProfile,
              user_access: userProfile?.user_access?.map((uc: any) => uc?.value),
              user_roles: userProfile?.user_role?.map((uc: any) => uc?.value),
            };
            this.form.patchValue(formValues, { emitEvent: false });
          }
        });
    }
  }

  ngOnInit(): void {
    
    this.$access = this.store.pipe(select(getAllAccessSelector));
    this.$roles = this.store.pipe(select(getAllRolesSelector));
  }

  ngAfterViewInit(): void {
    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public onSave(): void {
    if (this.form.valid && this.id) {
      const payload = {
        id: this.id,
        ...this.form.value
      }
      this.store.dispatch(saveUserAction({ payload }));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.form = changes?.form?.currentValue;
  }
}