import { NotificationsService } from './../../services/notifications.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [NotificationsService]
})
export class Notifications {

  public notifications = [];

  constructor(public navCtrl: NavController, public notificationService: NotificationsService, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
    this.notificationService.getNotifications().then(res => {
      console.log("res1", res);
   //   this.notifications = res.notifications;
      console.log(this.notifications);

    });

    this.notificationService.getRequests().then(res => {
      console.log("res2", res);
      this.notifications = res.notifications;

    })


  }

  //POPOVER HEADER
  openMenusHeader(ev) {
    let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
    popover.present({
      ev: ev
    });
  }


}
