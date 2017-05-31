import { VolsService } from './../../services/vols.service';
import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-actions',
  templateUrl: 'actions.html',
  providers: [VolsService]
})
export class Actions {

  public tabsActions: any;
  public my_applies = [];
  public my_confirmeds = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public volsService: VolsService) {
    this.tabsActions = "nextActions";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Actions');
    this.getMyApplies();
    this.getMyConfirmed();
  }

  //POPOVER HEADER
  openMenusHeader(ev) {
    let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
    popover.present({
      ev: ev
    });
  }

  //NEWACTION
  newAction() {
    this.navCtrl.push("NewAction");
  }

  getMyApplies() {
    this.volsService.getMyApplies().then(res => {
      
      if(res){
        this.my_applies = res.vols;
      }
      else{
        console.log("LEL", res)
      }
    })
  }

  getMyConfirmed() {
    this.volsService.getMyConfirms().then(res => {
      console.log("a", res)
       if(res){
         this.my_confirmeds = res.vols;
      }
      else{
         console.log("LUL", res)
      }
     
    })
  }

}
