import { FeedService } from './feed.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, PopoverController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
})

export class Feed {

    public sum: number = 0;
    public vols = [];
    public showFeed: boolean = false;

    constructor(public navParams: NavParams, public popoverCtrl: PopoverController, private feedService: FeedService, public loadingCtrl: LoadingController) {
        // GET FEED
    }


    ionViewDidLoad() {
        this.showFeed = false;
        this.loadFeed(true, 2, 0);
        this.sum = 2;
    }

    doRefresh(refresher) {
        this.sum = 0;


        this.loadFeed(true, 2, 0).then(res => {

            refresher.complete();
            console.log("end")
        })

    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');


        this.loadFeed(false, 2, this.sum + 2).then(res => {
            this.sum = this.sum + 2;

            infiniteScroll.complete();
            console.log("end")
        })


    }

    loadFeed(replace, amount, startAt) {

        return this.feedService.getVols(amount, startAt).then(res => {
            if (replace) {
                this.vols = res.vols;

            } else {
                this.vols = this.vols.concat(res.vols);

            }

            for (let i = 0; i < res.vols.length; i++) {
                let index = this.vols.findIndex(x => x.vol.id_vol == res.vols[i].vol.id_vol);
                console.log("index", index)

                this.feedService.countLikes(this.vols[index].vol.id_vol)
                    .then(res => {
                        this.vols[index].vol.likes = res.likes;
                    })
                this.feedService.checkLike(this.vols[index].vol.id_vol)
                    .then(res => {
                        this.vols[index].vol.likeState = parseInt(res.state);

                    }).catch(err => {
                        console.log("ERRRO CHECK", err);
                    });
            }

        })
            .catch(err => console.log(err));
    }



    /*
    
                */
    //POPOVER HEADER
    openMenus(ev) {
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0' });
        popover.present({
            ev: ev
        });
    }

}
