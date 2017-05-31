import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class Entry {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Entry');
  }

  goLogin(){
    this.navCtrl.push("Login");
  }

  goRegister(){
    this.navCtrl.push("Register0");
  }

}
