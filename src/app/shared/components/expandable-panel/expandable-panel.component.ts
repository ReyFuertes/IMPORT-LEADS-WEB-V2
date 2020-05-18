import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.scss']
})

export class ExpandablePanelComponent implements OnInit {
  panelOpenState = false;
  @Input()
  public expanded: boolean = false;
  @Input()
  public title: string = '';
  constructor() { }

  ngOnInit() { }
}
