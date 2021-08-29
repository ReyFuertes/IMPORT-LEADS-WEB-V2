import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'il-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public menus: Array<{ name: string, icon?: string, route?: string }> = [
    {
      name: 'contracts',
      icon: 'doc-icon-white.svg',
      route: 'dashboard/contracts'
    },
    {
      name: 'inspections',
      icon: 'search-icon-white.svg',
      route: 'dashboard/inspections'
    },
    {
      name: 'templates',
      icon: 'templates-icon-white.svg',
      route: 'dashboard/templates'
    },
    {
      name: 'tags',
      icon: 'tag-icon-white.svg',
      route: 'dashboard/tags'
    },
    {
      name: 'venues',
      icon: 'venues-icon-white.svg',
      route: 'dashboard/venues'
    },
    {
      name: 'users',
      icon: 'user-icon-white.svg',
      route: 'dashboard/users'
    },
    {
      name: 'performance insights',
      icon: 'performance-icon-white.svg',
      route: 'dashboard/performance-insights'
    },
    {
      name: 'inspection insights',
      icon: 'graph-icon-white.svg',
      route: 'dashboard/inspection-insights'
    }
  ];
  constructor() {  }

  ngOnInit() { }
}
