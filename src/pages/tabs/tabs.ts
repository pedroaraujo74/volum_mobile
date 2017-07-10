import { SocketService } from './../../services/socket.service';
import { AuthenticationService } from './../../shared/auth/authentication.service';
import { UsersService } from './../../services/users.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers: [UsersService, SocketService, LocalNotifications]
})

export class Tabs {

  tab1Root = "Feed";
  tab2Root = "Search";
  tab3Root = "Actions";
  tab4Root = "Chat";
  tab5Root = "Notifications";
  public tabIndex: number = 0;
  public newNotificationCount: number;
  public user: any;

  public profilePage;

  constructor(public navCtrl: NavController, private localNotifications: LocalNotifications, public navParams: NavParams, public socketService: SocketService, public auth: AuthenticationService, public usersService: UsersService) {

    let tabIndex = this.navParams.get('tabIndex');
    if (tabIndex) {
      this.tabIndex = tabIndex;
    }
    console.log(tabIndex);

    this.localNotifications.registerPermission();
    console.log("NOTIFICATI", this.localNotifications.hasPermission());



    setTimeout(() => {
      this.auth.userPromise.then(res => {
        this.user = res.user;
        this.getNotificationCount(this.user.id_user);
        this.socketService.onConnect(res.user.id_user);
        this.socketService.onNotification().subscribe(res => {
          this.newNotificationCount++;

          console.log("AAAA", res)
          let text;

          if (res['type'] == 3) {
            text = res['name'] + ' gostou da sua ação';
          }
          this.localNotifications.schedule([{
            id: 1,
            icon: res['photo'],
            title: res['name'],
            text: text,
            led: 'FF0000',

          }]);

        });


      })
    }, 500);

  }



  clear() {

    this.usersService.cleanNotifications(this.user.id_user).then(res => {
      this.newNotificationCount = 0;
    });
  }



  getNotificationCount(id) {
    this.usersService.newNotificationCount(id).then(res => {
      this.newNotificationCount = res.count;
    })
  }

}
