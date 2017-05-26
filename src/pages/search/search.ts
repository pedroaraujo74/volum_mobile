import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class Search {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search');
  }

  //POPOVER HEADER
  openMenusHeader(ev){
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
      popover.present({
          ev: ev
      });
  }

}
