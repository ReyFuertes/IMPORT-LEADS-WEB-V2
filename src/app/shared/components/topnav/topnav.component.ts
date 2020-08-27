import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/modules/contracts/store/reducers';
import { logoutAction } from 'src/app/modules/auth/store/auth.action';

@Component({
  selector: 'il-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})

export class TopNavComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public toolbarMenu: Array<{
    label: string, route?: string, children?: Array<{
      label: string, route?: string
    }>
  }>;
  public user: IUser;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.toolbarMenu = [
      {
        label: 'AGREEMENTS',
        route: '/dashboard/contracts',
        children: [
          {
            label: 'TEMPLATES',
            route: '/dashboard/templates',
          },
          {
            label: 'TAGS',
            route: '/dashboard/tags',
          }
        ]
      },
      {
        label: 'ASSESMENTS',
        route: '/dashboard/inspections',
      },
      {
        label: 'DATA',
        route: '/dashboard/performance-insights',
      },
      {
        label: 'VENUES',
        route: '/dashboard/venues',
      },
      {
        label: 'PRODUCTS',
        route: '/dashboard/products',
      }
    ];
    const localUser = JSON.parse(localStorage.getItem('at')) || null;
    if (localUser) {
      this.user = localUser.user;
    }
  }

  public onLogout(): void {
    this.store.dispatch(logoutAction());
  }
}
