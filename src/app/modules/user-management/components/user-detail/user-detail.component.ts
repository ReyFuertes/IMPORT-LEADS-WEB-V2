import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { getAllRolesSelector, getAccessSelector, getUserLangSelector } from 'src/app/store/selectors/app.selector';
import { environment } from 'src/environments/environment';
import { saveUserAction } from '../../store/user-mgmt.actions';
import { ActivatedRoute } from '@angular/router';
import { UserMgmtService } from '../../user-mgmt.service';
import { tap, takeUntil } from 'rxjs/operators';
import { IUser } from '../../user-mgmt.model';
import { getUserByIdSelector } from '../../store/user-mgmt.selectors';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { emailRegex } from 'src/app/shared/util/email';
import { USERMNGMNTROUTE } from 'src/app/shared/constants/routes';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private cdRef: ChangeDetectorRef, public translateService: TranslateService, private route: ActivatedRoute, private store: Store<AppState>, private fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      id: [null],
      username: [null, Validators.compose([Validators.required, Validators.pattern(emailRegex.email)])],
      user_access: [null],
      user_role: [null],
      password: [null, Validators.required],
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

  }

  ngOnInit(): void {
    this.$access = this.store.pipe(select(getAccessSelector));
    this.$roles = this.store.pipe(select(getAllRolesSelector));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.store.pipe(select(getUserByIdSelector(this.id)))
          .pipe(takeUntil(this.$unsubscribe), tap((user: IUser) => {

            let userAccess = user && user.user_access.map(u => {
              return String(u.access.id)
            });
            let userRoles = user && user.user_role.map(u => {

              return String(u.role.id)
            });
            let formUser = Object.assign({}, user, { user_access: userAccess }, { user_role: userRoles });

            this.form.patchValue(formUser);

          })).subscribe();
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
    if (changes && changes.form && changes.form.currentValue) {
      this.form = changes.form.currentValue;
    }
  }
}