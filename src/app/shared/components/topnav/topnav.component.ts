import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { logoutAction } from 'src/app/modules/auth/store/auth.action';
import { IUser } from 'src/app/modules/user-management/user-mgmt.model';
import { Observable } from 'rxjs';
import { getAccessSelector, getUserAccessSelector } from 'src/app/store/selectors/app.selector';
import { ISimpleItem } from '../../generics/generic.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent implements OnInit {
  public apilUrlPath: string = environment.apiImagePath;
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

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(getUserAccessSelector)).subscribe(res => {
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
            const children = parent.children.filter(c => this.accessMenus.includes(c.access_name)
            && c.access_name !== 'TEMPLATES'); //do not include the templates for now
            parent.children = children;
          });

          return parentMenuMatches;
        }));
      }
    })

    const localUser = JSON.parse(localStorage.getItem('at')) || null;
    if (localUser) {
      this.user = localUser.user;
    }
  }

  public get getProfilePic(): string {
    return this.user && this.user.image
      ? this.apilUrlPath + this.user.image
      : this.imgPath + 'no-image.png';
  }

  public onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
