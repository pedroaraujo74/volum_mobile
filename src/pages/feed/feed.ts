import { FeedService } from './feed.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, PopoverController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
    providers: [FeedService]
})
export class Feed {

    public vols = [];

    constructor(public navParams: NavParams,  public popoverCtrl: PopoverController, private feedService: FeedService, public loadingCtrl: LoadingController) {
         let loading = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loading.present();
        this.feedService.getVols().then(res => {
            this.vols = res.vols;
            loading.dismiss()
        })
        .catch(err => console.log(err));
    }


    //POPOVER HEADER
    openMenus(ev){
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0' });
        popover.present({
              ev: ev
          });
    }

}
