import { Component, OnInit } from '@angular/core';
import { ChatUser, ChatMessages } from '../../chat.models';

@Component({
  selector: 'il-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public chatUsers: ChatUser[] = [
    {
      id: 1,
      name: 'Jane Doe',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    },
    {
      id: 2,
      name: 'John Doe',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    },
    {
      id: 3,
      name: 'Koen',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    },
    {
      id: 4,
      name: 'Koen, Mary Jane, Tam',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    },
    {
      id: 5,
      name: 'Mary Jane',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    },
    {
      id: 6,
      name: 'Tammy Li',
      image: 'profile.png',
      subject: 'Long subject name',
      lastChat: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text of the printing'
    }
  ];
  id: number;
  user: string;
  image: string;
  time: string;
  message: string;
  isSender: boolean;
  public chatMessages: ChatMessages[] = [
    {
      id: 1,
      userId: 2,
      date: 'Yesterday',
      messages: [
        {
          id: 1,
          image: 'profile.png',
          time: '09:56 AM',
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          isSender: false
        },
        {
          id: 2,
          image: 'profile.png',
          time: '10:12 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: true
        },
        {
          id: 3,
          image: 'profile.png',
          time: '10:24 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: false
        },
        {
          id: 5,
          image: 'profile.png',
          time: '10:28 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: true
        }
      ]
    },
    {
      id: 1,
      userId: 2,
      date: 'Today',
      messages: [
        {
          id: 1,
          image: 'profile.png',
          time: '09:56 AM',
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
          isSender: false
        },
        {
          id: 2,
          image: 'profile.png',
          time: '10:12 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: true
        },
        {
          id: 3,
          image: 'profile.png',
          time: '10:24 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: false
        },
        {
          id: 5,
          image: 'profile.png',
          time: '10:28 AM',
          message: 'Lorem Ipsum is simply text.',
          isSender: true
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
