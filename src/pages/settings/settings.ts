import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalController: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  //POPOVER HEADER
  openMenusHeader(ev){
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '4', userId: '1'});
      popover.present({
          ev: ev
      });
  }

  //PROFILE SETTING 
  goProfileSetting(value){
    let type = value;
    this.navCtrl.push("ProfileSettings", {type: type});
  }

    //OPEN MODAL PRIVACITY
    openModalPrivacity(value){
        let modal = this.modalController.create("ModalSettings", {typeSettings:value});
        modal.present();
    }
}
