import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class Tabs {

  tab1Root = "Feed";
  tab2Root = "Search";
  tab3Root = "Actions";
  tab4Root = "Chat";
  tab5Root = "Notifications";
  public tabIndex: Number = 0;



  public profilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      let tabIndex = this.navParams.get('tabIndex');
      if(tabIndex){
          this.tabIndex = tabIndex;
      }

      

  }

}
