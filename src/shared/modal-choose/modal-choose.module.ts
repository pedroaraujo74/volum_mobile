import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalChoose } from './modal-choose';

@NgModule({
  declarations: [
    ModalChoose,
  ],
  imports: [
    IonicPageModule.forChild(ModalChoose),
  ],
  exports: [
    ModalChoose
  ]
})
export class ModalChooseModule {}
