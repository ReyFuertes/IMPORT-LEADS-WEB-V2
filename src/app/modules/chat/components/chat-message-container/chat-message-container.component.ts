import { Component, OnInit, Input } from '@angular/core';
import { ChatMessages } from '../../chat.models';

@Component({
  selector: 'il-chat-message-container',
  templateUrl: './chat-message-container.component.html',
  styleUrls: ['./chat-message-container.component.scss']
})
export class ChatMessageContainerComponent implements OnInit {

  @Input()
  public chatMessages: ChatMessages[];
  constructor() { }

  ngOnInit() {
  }

}
