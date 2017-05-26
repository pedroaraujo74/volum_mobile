import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSettings } from './modal-settings';

@NgModule({
  declarations: [
    ModalSettings,
  ],
  imports: [
    IonicPageModule.forChild(ModalSettings),
  ],
  exports: [
    ModalSettings
  ]
})
export class ModalSettingsModule {}
