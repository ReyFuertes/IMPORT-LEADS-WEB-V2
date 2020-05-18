import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';

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
  constructor(private router: Router) { }

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
  }
}
