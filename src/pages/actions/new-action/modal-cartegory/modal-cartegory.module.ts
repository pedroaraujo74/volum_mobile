import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCartegory } from './modal-cartegory';

@NgModule({
  declarations: [
    ModalCartegory,
  ],
  imports: [
    IonicPageModule.forChild(ModalCartegory),
  ],
  exports: [
    ModalCartegory
  ]
})
export class ModalCartegoryModule {}
