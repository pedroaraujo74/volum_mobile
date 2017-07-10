import { Clipboard } from '@ionic-native/clipboard';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Card } from './card';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    Card,
  ],
  imports: [
    IonicPageModule.forChild(Card),
    MomentModule
  ],
  exports: [
    Card
  ]
})
export class CardModule { }
