import { environment } from '../../../../environments/environment';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'il-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  
  @Output() public sortEmitter = new EventEmitter<any>();
  @Input() public options: Array<{ label: string, value: any }> = [];

  constructor() { }

  ngOnInit() { }

  public onClick(option: any): void {
    this.sortEmitter.emit(option);
  }
}
