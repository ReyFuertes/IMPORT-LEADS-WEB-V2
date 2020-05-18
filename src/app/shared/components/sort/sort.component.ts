import { environment } from '../../../../environments/environment';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'il-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public sortEmitter = new EventEmitter<number>();
  public options: Array<{ label: string, value: number }> = [
    {
      label: 'Sort by ID',
      value: 1
    },
    {
      label: 'Sort by Date',
      value: 2
    }
  ];
  constructor() { }

  ngOnInit() { }
}
