import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-cartegory',
  templateUrl: 'modal-cartegory.html',
})
export class ModalCartegory {

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCartegory');
  }

  dismiss() {
      this.viewCtrl.dismiss();
  }

}
