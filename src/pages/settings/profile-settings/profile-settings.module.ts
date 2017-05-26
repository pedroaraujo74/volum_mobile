import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileSettings } from './profile-settings';

@NgModule({
  declarations: [
    ProfileSettings,
  ],
  imports: [
    IonicPageModule.forChild(ProfileSettings),
  ],
  exports: [
    ProfileSettings
  ]
})
export class ProfileSettingsModule {}
