import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardList } from './card-list';

@NgModule({
  declarations: [
    CardList,
  ],
  imports: [
    IonicPageModule.forChild(CardList),
  ],
  exports: [
    CardList
  ]
})
export class CardListModule {}
