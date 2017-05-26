import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Users } from './users';

@NgModule({
  declarations: [
    Users,
  ],
  imports: [
    IonicPageModule.forChild(Users),
  ],
  exports: [
    Users
  ]
})
export class UsersModule {}
