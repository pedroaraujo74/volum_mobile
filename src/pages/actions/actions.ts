import { AuthenticationService } from './../../shared/auth/authentication.service';
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
  public invites = [];
  public actions = [];
  public user: any;
  constructor(public navCtrl: NavController, public auth: AuthenticationService, public navParams: NavParams, public popoverCtrl: PopoverController, public volsService: VolsService) {
    this.tabsActions = "nextActions";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Actions');
    this.getMyApplies();
    this.getMyConfirmed();

    this.auth.userPromise.then(res => {
      this.user = res.user;
      this.getActions(this.user.id_user);
    });
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

      if (res) {
        this.my_applies = res.vols;
        console.log("APPLIES", this.my_applies)
      }
      else {
        console.log("LEL", res)
      }
    })

  }

  getInvites() {
    this.volsService.listInvites().then(res => {

      if (res) {
        this.invites = res.vols;
      }
      else {
      }
    })
  }
  visit(id_vol, name) {

    this.navCtrl.push("CardDetails", { volId: id_vol, volName: name });

  }

  getActions(id) {
    this.volsService.getMyVols(id).then(res => {
      this.actions = res.vols;
      console.log("ACTIOS", this.actions);

    });
  }

  getMyConfirmed() {
    this.volsService.getMyConfirms().then(res => {
      console.log("a", res)
      if (res) {
        this.my_confirmeds = res.vols;
      }
      else {
        console.log("LUL", res)
      }

    })
  }

}
