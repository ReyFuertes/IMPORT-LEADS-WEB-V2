import { GenericContainer } from './../../../shared/generics/generic-container';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'il-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent extends GenericContainer implements OnInit {
  constructor() {
    super();
  }
}
