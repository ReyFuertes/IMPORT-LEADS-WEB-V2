import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'il-primeng-editor',
  templateUrl: './primeng-editor.component.html',
  styleUrls: ['./primeng-editor.component.scss']
})
export class PrimengEditorComponent implements OnInit {

  @Input()
  public value: string;
  constructor() { }

  ngOnInit() {
  }

}
