import { VolsService } from './../../../services/vols.service';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Comments } from './comments';

@NgModule({
  declarations: [
    Comments,
  ],
  imports: [
    IonicPageModule.forChild(Comments),
    MomentModule
  ],
  exports: [
    Comments
  ],
  providers: [VolsService]
})
export class CommentsModule { }
