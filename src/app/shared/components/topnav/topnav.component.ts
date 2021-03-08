import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { logoutAction } from 'src/app/modules/auth/store/auth.action';
import { IUser } from 'src/app/modules/user-management/user-mgmt.model';
import { Observable } from 'rxjs';
import { getAccessSelector, getAppUserProfileSelector, getUserAccessSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from '../../generics/generic.model';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { sortByAsc, sortByDesc } from '../../util/sort';
import { CHANGEPASSWORDROUTE, CONTRACTSROUTE, PROFILEROUTE, SETTINGSROUTE, USERMNGMNTROUTE } from 'src/app/shared/constants/routes';
import { GenericDestroyPageComponent } from '../../generics/generic-destroy-page';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent extends GenericDestroyPageComponent implements OnInit {
  public apiImagePath: string = environment.apiImagePath;
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public toolbarMenu: Array<{
    label: string, route?: string, children?: Array<{
      label: string, route?: string
    }>
  }>;
  public user: IUser;
  public $menus: Observable<ISimpleItem[]>;
  public excludedMenus: string[] = ['CHAT', 'SETTINGS'];
  public accessMenus: string[] = [];
  public contractsRoute = CONTRACTSROUTE;
  public settingsRoute = SETTINGSROUTE;
  public profileRoute = PROFILEROUTE;
  public userMngmntRoute = USERMNGMNTROUTE;
  public changePasswordRoute = CHANGEPASSWORDROUTE;

  constructor(private storageSrv: StorageService, private cdRef: ChangeDetectorRef, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.store.pipe(select(getUserAccessSelector),
      takeUntil(this.$unsubscribe)).subscribe(res => {
        if (res) {
          /* process user access menus */
          this.accessMenus.push(...res);
         
          this.$menus = this.store.pipe(select(getAccessSelector), map(m => {
            /* filter the parent menus */
            let parentMenuMatches = m?.filter(
              m => !m.parent
                && !this.excludedMenus.includes(m.label)
                && this.accessMenus.includes(m.label)
            );
            /* filter the children menus */
            parentMenuMatches?.forEach(parent => {
              const children = parent?.children?.filter(c => this.accessMenus.includes(c.access_name)
                && c.access_name !== 'TEMPLATES'); //do not include the templates for now
              parent.children = children.sort((a, b) => sortByAsc(a, b, 'position'));

            });

            return parentMenuMatches;
          }));
        }
      })

    this.store.pipe(select(getAppUserProfileSelector),
      takeUntil(this.$unsubscribe))
      .subscribe(res => {
        if (res) {

          const user = Object.assign({}, res, {
            username: `${res?.firstname} ${res?.lastname}`
          });

          const localUser = JSON.parse(this.storageSrv.get('at')) || null;
          if (localUser) {
            this.user = localUser.user;
          }

          this.user = user || localUser.user;

          this.cdRef.detectChanges();
        }
      })
  }

  public get getProfilePic(): string {
    return this.user?.image ? this.apiImagePath + this.user?.image
      : this.imgPath + 'default-profile-pic.png';
  }

  public onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
