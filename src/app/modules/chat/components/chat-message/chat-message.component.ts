import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../chat.models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'il-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  public svgPath: string = environment.imgPath;
  @Input()
  public message: Message;
  constructor() { }

  ngOnInit() {
  }

}
