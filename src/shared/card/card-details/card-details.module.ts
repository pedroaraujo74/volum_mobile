import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardDetails } from './card-details';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    CardDetails,
  ],
  imports: [
    IonicPageModule.forChild(CardDetails),
    MomentModule
  ],
  exports: [
    CardDetails
  ]
})
export class CardDetailsModule {}
