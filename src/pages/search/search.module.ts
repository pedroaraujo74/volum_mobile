import { UsersModule } from './../../components/users/users.module';
import { CardListModule } from './../../components/card-list/card-list.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Search } from './search';


@NgModule({
  declarations: [
    Search,
  ],
  imports: [
    CardListModule,
    UsersModule,
    IonicPageModule.forChild(Search),
  ],
  exports: [
    Search
  ]
})
export class SearchModule {}
