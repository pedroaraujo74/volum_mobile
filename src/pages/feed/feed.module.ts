import { FeedService } from './feed.service';
import { CardModule } from './../../shared/card/card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Feed } from './feed';



@NgModule({
  declarations: [
    Feed,
  ],
  providers: [FeedService],
  imports: [
    CardModule,
    IonicPageModule.forChild(Feed),
  ],
  exports: [
    Feed
  ]
})
export class FeedModule {

}
