import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
})
export class Actions {

  public tabsActions : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
      this.tabsActions = "nextActions";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Actions');
  }

  //POPOVER HEADER
  openMenusHeader(ev){
      let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1'});
      popover.present({
          ev: ev
      });
  }

  //NEWACTION
  newAction(){
    this.navCtrl.push("NewAction");
  }

}
