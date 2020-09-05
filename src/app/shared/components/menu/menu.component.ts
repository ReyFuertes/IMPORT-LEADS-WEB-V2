import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { ISimpleItem } from '../../generics/generic.model';

@Component({
  selector: 'il-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input()
  public menu: {
    label: string, children?: Array<{
      label: string, user_route?: string
    }>, user_route?: string
  };
  constructor() { }

  ngOnInit() {}

  public hasChildren(menu: ISimpleItem): boolean {
    return this.menu && this.menu.children.length > 0;
  }
}
