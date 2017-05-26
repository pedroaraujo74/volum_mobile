import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class Participants {

   tabs:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
       this.tabs = this.navParams.get('participants');
  }

}
