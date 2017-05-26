import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Entry } from './entry';

@NgModule({
  declarations: [
    Entry,
  ],
  imports: [
    IonicPageModule.forChild(Entry),
  ],
  exports: [
    Entry
  ]
})
export class EntryModule {}
