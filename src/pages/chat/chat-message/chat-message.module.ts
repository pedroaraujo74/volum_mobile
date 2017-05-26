import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessage } from './chat-message';

@NgModule({
  declarations: [
    ChatMessage,
  ],
  imports: [
    IonicPageModule.forChild(ChatMessage),
  ],
  exports: [
    ChatMessage
  ]
})
export class ChatMessageModule {}
