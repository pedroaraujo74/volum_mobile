import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';

/**
 * Generated class for the NewAction page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-action',
  templateUrl: 'new-action.html',
})
export class NewAction {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewAction');
  }

  //POPOVER HEADER
  openMenusHeader(ev){
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
      popover.present({
          ev: ev
      });
  }

  openModalCategory(){
      const modal = this.modalController.create("ModalCartegory");
      modal.present();
  }

  openModalLocation(){
      const modal = this.modalController.create("ModalLocation");
      modal.present();
  }



}
