import { MomentModule } from 'angular2-moment';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chat } from './chat';

@NgModule({
  declarations: [
    Chat,
  ],
  imports: [
    IonicPageModule.forChild(Chat),
    IonicStorageModule,
    MomentModule
  ],
  exports: [
    Chat
  ]
})
export class ChatModule {}
