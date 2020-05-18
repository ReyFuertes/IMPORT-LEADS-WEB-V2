import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-template-container',
  templateUrl: './template-container.component.html',
  styleUrls: ['./template-container.component.scss']
})

export class TemplatesContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
