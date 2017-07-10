import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessage } from './chat-message';

@NgModule({
  declarations: [
    ChatMessage,
  ],
  imports: [
    MomentModule,
    IonicPageModule.forChild(ChatMessage),
  ],
  exports: [
    ChatMessage
  ]
})
export class ChatMessageModule { }
