import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Invite } from './invite';

@NgModule({
  declarations: [
    Invite,
  ],
  imports: [
    IonicPageModule.forChild(Invite),
  ],
  exports: [
    Invite
  ]
})
export class InviteModule {}
