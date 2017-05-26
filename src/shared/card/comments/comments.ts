import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class Comments {

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Comments');
    }

    //POPOVER HEADER
    openMenusHeader(ev){
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
        popover.present({
            ev: ev
        });
    }

    openMenusCard(ev){
        let popover = this.popoverCtrl.create("Popover", { typePopOver: '3', userId: '1'});
        popover.present({
            ev: ev
        });
    }

}
