import { Menu } from './../../generics/generic.model';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss']
})

export class PopoverMenuComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  @Input() public menus: Menu[];
  
  constructor() { }

  ngOnInit() { }
}
