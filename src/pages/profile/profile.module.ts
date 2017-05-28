import { MomentModule } from 'angular2-moment';
import { UsersModule } from './../../components/users/users.module';
import { CardListModule } from './../../components/card-list/card-list.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';


@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    CardListModule,
    UsersModule,
    MomentModule,
    IonicPageModule.forChild(Profile),
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule {

}
