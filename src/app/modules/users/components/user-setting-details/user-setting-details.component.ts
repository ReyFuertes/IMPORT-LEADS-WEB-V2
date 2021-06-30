import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUserProfile } from '../../users.models';
import { getUserProfileSelector } from '../../store/selectors/user-profile.selector';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { takeUntil } from 'rxjs/operators';
import { GenericDestroyPageComponent } from 'src/app/shared/generics/generic-destroy-page';
import { updateProfileAction } from '../../store/actions/user-profile.actions';
import { ISimpleItem } from 'src/app/shared/generics/generic.model';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage.service';
import { setDefaultLangAction } from 'src/app/store/actions/app.action';
import { getUserLangSelector } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'il-user-setting-details',
  templateUrl: './user-setting-details.component.html',
  styleUrls: ['./user-setting-details.component.scss']
})
export class UserSettingDetailsComponent extends GenericDestroyPageComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public form: FormGroup;
  public $detail: Observable<IUserProfile>;
  public languages: ISimpleItem[] = [{
    label: 'English',
    value: 'en'
  }, {
    label: 'Chinese',
    value: 'cn'
  }];

  constructor(private cdRef: ChangeDetectorRef, public storageSrv: StorageService, public translateService: TranslateService, private store: Store<AppState>, public fb: FormBuilder) {
    super();

    this.form = this.fb.group({
      id: [null],
      position: [null],
      role: [null],
      company_address: [null],
      company_linkedin: [null],
      company_name: [null],
      email: [null],
      facebook: [null],
      firstname: [null],
      image: [null],
      lastname: [null],
      phone: [null],
      qqid: [null],
      self_intro: [null],
      twitter: [null],
      wechatid: [null],
      language: [null]
    });

    this.form.get('language').valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(language => {
        translateService.use(language);
        storageSrv.set('lang', language);
        this.store.dispatch(setDefaultLangAction({ language }));
      });
  }

  ngOnInit() {
    this.store.pipe(select(getUserProfileSelector),
      takeUntil(this.$unsubscribe)).subscribe(res => {
        this.form.patchValue({
          id: res?.id,
          firstname: res?.firstname,
          lastname: res?.lastname,
          phone: res?.phone,
          email: res?.email,
          company_name: res?.company_name,
          company_address: res?.company_address
        });
      });

    this.store.pipe(select(getUserLangSelector), takeUntil(this.$unsubscribe))
      .subscribe(language => {
        if (language) {
          this.translateService.use(language);
          this.cdRef.detectChanges();
        }
      });
  }

  public updateProfile(): void {
    const payload = this.form?.value;
    if (payload) {
      /* update profile data */
      this.store.dispatch(updateProfileAction({ payload }));
    }
  }
}
