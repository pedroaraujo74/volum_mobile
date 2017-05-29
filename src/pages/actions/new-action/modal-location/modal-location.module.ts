import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLocation } from './modal-location';

@NgModule({
  declarations: [
    ModalLocation,
  ],
  imports: [
    IonicPageModule.forChild(ModalLocation),
  ],
  exports: [
    ModalLocation
  ]
})
export class ModalLocationModule {}
