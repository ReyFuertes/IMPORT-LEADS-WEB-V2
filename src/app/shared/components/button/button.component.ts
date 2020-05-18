import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input()
  public label: string = '';
  @Input()
  public type: string = 'default';
  @Input()
  public img: string = '';
  constructor() { }

  ngOnInit() { }
}
