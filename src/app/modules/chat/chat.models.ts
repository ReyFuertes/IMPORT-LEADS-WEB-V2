export interface ChatUser {
  id: number;
  name: string;
  image: string;
  subject: string;
  lastChat: string;
}

export interface ChatMessages {
  id: number;
  userId: number;
  date: string;
  messages?: Message[];
}

export interface Message {
  id: number;
  image: string;
  time: string;
  message: string;
  isSender: boolean;
}

