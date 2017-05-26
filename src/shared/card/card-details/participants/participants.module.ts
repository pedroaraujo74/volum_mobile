import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Participants } from './participants';

@NgModule({
  declarations: [
    Participants,
  ],
  imports: [
    IonicPageModule.forChild(Participants),
  ],
  exports: [
    Participants
  ]
})
export class ParticipantsModule {}
