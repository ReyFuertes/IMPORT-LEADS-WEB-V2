import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-ellipse-menu',
  templateUrl: './ellipse-menu.component.html',
  styleUrls: ['./ellipse-menu.component.scss']
})

export class EllipseMenuComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor() { }

  ngOnInit() { }
}
