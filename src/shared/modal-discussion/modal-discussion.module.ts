import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDiscussion } from './modal-discussion';

@NgModule({
  declarations: [
    ModalDiscussion,
  ],
  imports: [
    IonicPageModule.forChild(ModalDiscussion),
  ],
  exports: [
    ModalDiscussion
  ]
})
export class ModalDiscussionModule {}
