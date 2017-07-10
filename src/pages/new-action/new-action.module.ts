import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAction } from './new-action';

@NgModule({
  declarations: [
    NewAction,
  ],
  imports: [
    IonicPageModule.forChild(NewAction),
  ],
  exports: [
    NewAction
  ]
})
export class NewActionModule {}
