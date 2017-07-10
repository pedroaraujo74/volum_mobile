import { Profile } from './../profile/profile';
import { NotificationsService } from './../../services/notifications.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [NotificationsService]
})
export class Notifications {

  public notifications = [];
  public sum: number = 0;
  constructor(public navCtrl: NavController, public notificationService: NotificationsService, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad Notifications');
    this.getNotifications(true, 10, 0);


  }
  getNotifications(replace, amount, startAt) {


    return this.notificationService.getNotifications(amount, startAt).then(res => {
      if (replace) {
        this.notifications = res.notifications;
      } else {
        this.notifications = this.notifications.concat(res.notifications);
      }

      console.log(this.notifications);

    });

  }

  doRefresh(refresher) {
    this.sum = 0;


    this.getNotifications(true, 10, 0).then(res => {

      refresher.complete();
    })

  }

  doInfinite(infiniteScroll) {
    this.getNotifications(false, 10, this.sum + 10).then(res => {
      this.sum = this.sum + 10;

      infiniteScroll.complete();
      console.log("end")
    })

  };

  visit(id_user, id_vol, type, name, user_name, photo_url) {
    if (type == 2) {

      this.navCtrl.push("Profile", { id_user: id_user });

    } else if (type == 6) {
      this.navCtrl.push("Finish", { id_user: id_user, user_name: user_name, id_vol: id_vol, name: name, photo_url: photo_url });

    } else {
      this.navCtrl.push("CardDetails", { volId: id_vol, volName: name });

    }
  }

  //POPOVER HEADER
  openMenusHeader(ev) {
    let popover = this.popoverCtrl.create("Popover", { typePopOver: '0', userId: '1' });
    popover.present({
      ev: ev
    });
  }


}
