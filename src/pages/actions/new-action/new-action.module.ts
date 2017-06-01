import { NewActionsService } from './../../../services/newActions.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAction } from './new-action';
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    NewAction,
  ],
  imports: [
    IonicPageModule.forChild(NewAction),
  ],
  exports: [
    NewAction
  ],
   providers: [NewActionsService, Camera]
})
export class NewActionModule {}
